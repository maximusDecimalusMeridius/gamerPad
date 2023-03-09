//loop in dependencies
const express = require("express");
const router = express.Router();
const {Note, User, UserNote} = require("../models");
const jwt = require("jsonwebtoken");

//GET all records
// router.get("/", async (req, res) => {
//     try {
//         const results = await Note.findAll({
//             include:[{model:User, as: "Author", foreignKey: "AuthorId"}]
//         });
//         res.json(results);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error getting all Notes!" })
//     }
// })

//GET Notes by current logged in user
router.get("/currentUserNotes", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to See Notes" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);

        const userData = await User.findByPk(tokenData.id, {include:[{model:Note, as: "WritenNotes", foreignKey: "AuthorId"},{model:Note, include:[{model:User, as: "Author", attributes:["username"]}]}], attributes:["id", "username"]});

        if (userData) {
            return res.json(userData);
        } else {
            res.status(404).json({
                message: "No such user exists!"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting data - couldn't find Users Notes" })
    }
})

//Share note with User
router.post("/addUser", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res
            .status(403)
            .json({ isValid: false, msg: "you must be logged in to share a Note!" });
    }
    try{
        const noteData = await Note.findByPk(req.body.NoteId);
    if(!noteData){
        res.status(404).json({
            message: "No such note exists!"
        })
    } else {
        const userNoteData = await noteData.addUser(req.body.UserId)
        res.json(userNoteData)
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting data" })
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
router.put("/:id", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to add a Note" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const foundNote = await Note.findByPk(req.params.id)

        if (!foundNote) {
            return res.status(404).json({ msg: "no such Note!" });
        }

        if (foundNote.AuthorId !== tokenData.id) {
            return res.status(403).json({ msg: "you can only edit a note you wrote!" });
        }

        const result = await Note.update(req.body, {
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
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to Delete a Note" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const foundNote = await Note.findByPk(req.params.id)

        if (!foundNote) {
            return res.status(404).json({ msg: "No such Note!" });
        }

        if (foundNote.AuthorId !== tokenData.id) {
            return res.status(403).json({ msg: "You can only delete a note you wrote!" });
        }

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

//REMOVE a shared Note
router.delete("/removeSharedNote/:id", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to Delete a Shared Note" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const foundNote = await Note.findByPk(req.params.id)

        if (!foundNote) {
            return res.status(404).json({ msg: "no such Shared Note!" });
        }

        const removeConnection = foundNote.removeUser(tokenData.id)

        return res.json(removeConnection)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting record!" });
    }
})

module.exports = router;