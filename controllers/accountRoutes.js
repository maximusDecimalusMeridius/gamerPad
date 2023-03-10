//loop in dependencies
const express = require("express");
const router = express.Router();
const {Account, User} = require("../models");
const jwt = require("jsonwebtoken");

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

//GET accounts by current user id
router.get("/currentUserAccounts", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to get accounts by user id!" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const results = await User.findByPk(tokenData.id, {include:[{model:Account}], attributes:["id", "username"]});

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

//GET accounts by user id
router.get("/userAccounts/:id", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to get accounts by user id!" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const userAccountData = await User.findByPk(req.params.id, {include:[{model:Account}], attributes:["id", "username"]});

        if (userAccountData) {
            return res.json(userAccountData);
        } else {
            res.status(404).json({
                message: "No data exists!"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting data - couldn't find Account" })
    }
})

//POST a new record
router.post("/", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to add an account!" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const result = await Account.create({
            account:req.body.account,
            type:req.body.type,
            username:req.body.username,
            gamerTag:req.body.gamerTag,
            UserId:tokenData.id
        })

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating new Account' })
    }
})

//UPDATE a record
router.put("/:id", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to add an account!" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const accountData = await Account.findByPk(req.params.id)

        if(!accountData){
            return res.status(404).json({ msg: "No such Account found!" });
        }

        if(tokenData.id != accountData.UserId){
            return res.status(403).json({ msg: "You can only edit a note you created!" });
        }

        const result = await Account.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        return res.json({msg:"Account updated!"});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating record!" })
    }
})

//DELETE a record
router.delete("/:id", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to delete an account!" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const accountData = await Account.findByPk(req.params.id)

        if(!accountData){
            return res.status(404).json({ msg: "No such Account found!" });
        }

        if(tokenData.id != accountData.UserId){
            return res.status(403).json({ msg: "You can only delete a note you created!" });
        }

        const results = await Account.destroy({
            where: {
                id: req.params.id
            }
        })


        return res.json({msg:"Account deleted!"});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting record!" });
    }
})

module.exports = router;