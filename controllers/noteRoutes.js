//loop in dependencies
const express = require("express");
const router = express.Router();
const {Note, User} = require("../models");
const jwt = require("jsonwebtoken");

//GET all records
router.get("/", async (req, res) => {
    try {
        const results = await Note.findAll({
            include:[{model:User, as: "author", foreignKey: "AuthorId"}]
        });
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all Notes!" })
    }
})

//GET one record by id
router.get("/:id", async (req, res) => {
    try {
        const results = await Note.findByPk(req.params.id);

        if (results) {
            return res.json(results);
        } else {
            res.status(404).json({
                message: "No record exists!"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting data - couldn't find Note" })
    }
})

//POST a new record
router.post("/", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to add a Note" });
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    try {
        const result = await Note.create({
            title:req.body.title,
            textContent:req.body.textContent,
            color:req.body.color,
            AuthorId:tokenData.id
        })

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating new Note' })
    }
})

//UPDATE a record
//TODO: Check for token
router.put("/:id", async (req, res) => {
    try {
        const result = await Note.update({
            //TODO: Add Note attributes
            Thing1: "Object property"
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
        res.status(500).json({ message: "Error updating record!" })
    }
})

//DELETE a record
router.delete("/:id", async (req, res) => {
    try {
        const results = await Note.destroy({
            where: {
                id: req.params.id
            }
        })

        if (results) {
            return res.json(results)
        } else {
            return res.status(404).json({ message: "Note Delete - Record doesn't exist!" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting record!" });
    }
})

module.exports = router;