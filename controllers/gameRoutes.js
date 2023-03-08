//loop in dependencies
const express = require("express");
const router = express.Router();
const {Game, Platform} = require("../models");

//GET all records
router.get("/", async (req, res) => {
    try {
        const results = await Game.findAll({
            include: Platform
        });
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all Games!" })
    }
})

//GET one record by id
router.get("/:id", async (req, res) => {
    try {
        const results = await Game.findByPk(req.params.id);

        if (results) {
            return res.json(results);
        } else {
            res.status(404).json({
                message: "No record exists!"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting data - couldn't find Game" })
    }
})

    //DELETE a record
    //TODO: complete this 
    router.delete("/:id", async (req, res) => {
        try {
            const results = await Game.destroy({
                where: {
                    id: req.params.id
                }
            })

            if (results) {
                return res.json(results)
            } else {
                return res.status(404).json({ message: "Game Delete - Record doesn't exist!" })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error deleting record!" });
        }
    })

    module.exports = router;