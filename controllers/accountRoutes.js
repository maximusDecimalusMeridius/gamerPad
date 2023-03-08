//loop in dependencies
const express = require("express");
const router = express.Router();
const Account = require("../models/Account");

//GET all records
router.get("/", async (req, res) => {
    try {
        const results = await Account.findAll({});
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all Accounts!" })
    }
})

//GET one record by id
router.get("/:id", async (req, res) => {
    try {
        const results = await Account.findByPk(req.params.id);

        if (results) {
            return res.json(results);
        } else {
            res.status(404).json({
                message: "No record exists!"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting data - couldn't find Account" })
    }
})

//POST a new record
//TODO: Add a signed token
router.post("/", async (req, res) => {
    try {
        const result = await Account.create({
            //TODO: Add Account attributes
            Thing1: "Object property"
        })

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating new Account' })
    }
})

//UPDATE a record
//TODO: Check for token
router.put("/:id", async (req, res) => {
    try {
        const result = await Account.update({
            //TODO: Add Account attributes
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
        const results = await Account.destroy({
            where: {
                id: req.params.id
            }
        })

        if (results) {
            return res.json(results)
        } else {
            return res.status(404).json({ message: "Account Delete - Record doesn't exist!" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting record!" });
    }
})

module.exports = router;