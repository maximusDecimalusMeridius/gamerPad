//loop in dependencies
const express = require("express");
const {User,Note} = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

//GET all records
router.get("/", async (req, res) => {
    try {
        const allUsers = await User.findAll({include:[{model:Note, as: "writenNotes", foreignKey: "AuthorId"}]});
        res.json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all users!" })
    }
})

// Check if token is valide
router.get("/isValidToken", (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res
            .status(403)
            .json({ isValid: false, msg: "you must be logged in!" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        res.json({
            isValid: true,
            user: tokenData,
        });
    } catch (err) {
        res.status(403).json({
            isValid: false,
            msg: "invalid token",
        });
    }
});

//GET one record by id
router.get("/:id", async (req, res) => {
    try {
        const results = await User.findByPk(req.params.id);

        if (results) {
            return res.json(results);
        } else {
            res.status(404).json({
                message: "No record exists!"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting data - couldn't find user" });
    }
})

//POST a new User
router.post("/", async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        const token = jwt.sign(
            {
                username: newUser.username,
                id: newUser.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );
        res.json({
            token,
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating new user' })
    }
})

//UPDATE a record
router.put("/:id", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to edit User!" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = await User.findByPk(req.params.id)

        if (!foundUser) {
            return res.status(404).json({ msg: "no such User!" });
        }
        if (foundUser.id !== tokenData.id) {
            return res.status(403).json({ msg: "you can only edit logged in User!" });
        } else {
            const updatedUser = await User.update(req.body, {
                where: {
                    id: req.params.id
                }
            })

            return res.json(updatedUser)
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating record!" });
    }
})

//DELETE a record
router.delete("/:id", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to delete User!" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const foundUser = await User.findByPk(req.params.id)

        if (!foundUser) {
            return res.status(404).json({ msg: "no such User!" });
        }
        if (foundUser.id !== tokenData.id) {
            return res.status(403).json({ msg: "you can only edit logged in User!" });
        } else {
            const results = await User.destroy({
                where: {
                    id: req.params.id
                }
            })

            return res.json(results)
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting record!" });
    }
})

//POST route for login
router.post("/login", async (req, res) => {
    try {
        const foundUser = await User.findOne({
            where: {
                [Op.or]: [{ username: req.body.login }, [{ email: req.body.login }]]
            }
        })

        if (!foundUser) {
            return res.status(401).json({ msg: "Login POST - Incorrect Login" })
        } else if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
            return res.status(401).json({ msg: "Login POST - Incorrect Password" })
        } else {
            const token = jwt.sign(
                {
                    username: foundUser.username,
                    id: foundUser.id,
                    Theme: foundUser.Theme
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "6h",
                }
            );
            res.json({
                token,
                user: foundUser,
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error - logging in" });
    }
})


module.exports = router;