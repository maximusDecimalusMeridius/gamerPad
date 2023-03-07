//loop in dependencies
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");

//GET all records
router.get("/", async (req, res) => {
    try {
        const results = await User.findAll({});
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all users!" })
    }
})

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

//POST a new record
//TODO: Add a signed token
router.post("/", async (req, res) => {
    try {
        const result = await User.create({
            username: req.body.username,
            password: req.body.password
        })

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating new user' })
    }
})

//UPDATE a record
//TODO: Check for token
router.put("/:id", async (req, res) => {
    try {
        const result = await User.update({
            username: req.body.title,
            password: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        })

        if (result[0]) {
            return res.json(result);
        } else {
            return res.status(404).json({ message: "Record doesn't exist!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating record!" });
    }
})

//DELETE a record
router.delete("/:id", async (req, res) => {
    try {
        const results = await User.destroy({
            where: {
                id: req.params.id
            }
        })

        if (results) {
            return res.json(results)
        } else {
            return res.status(404).json({ message: "ACCOUNT Delete - Record doesn't exist!" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting record!" });
    }
})

//POST route for login
//TODO: Add a signed token
router.post("/login", async (req, res) => {
    try {
        const results = User.findOne({
            where: {
                username: req.body.username
            }
        })

        if (!results) {
            return res.status(401).json({ msg: "Login POST - Incorrect Username" })
        } else {
            if (bcrypt.compareSync(req.body.password, userData.password)) {
                return res.json(results)
            } else {
                return res.status(401).json({ msg: "Login POST - Incorrect Password" })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error - logging in" });
    }
})

//TODO: Define logout route
router.post("/logout", async (req, res) => {
    try {

    } catch (error) {

    }
})

module.exports = router;