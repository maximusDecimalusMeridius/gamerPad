//loop in dependencies
const express = require("express");
const router = express.Router();
const {Note, User} = require("../models");
const jwt = require("jsonwebtoken");

// GET all records
router.get("/", async (req, res) => {
    try {
        const results = await Note.findAll();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all Notes!" })
    }
})

// GET Notes by current logged in user
router.get("/currentUserNotes", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to See Notes" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);

        const userData = await User.findByPk(tokenData.id,{include:[{model:Note, as: "WritenNotes", foreignKey: "AuthorId", attributes:["id","title", "textContent", "color", "isShared", "createdAt"]},{model:Note, as: "SharedNotes", foreignKey: "SharedId", attributes:["id","title", "textContent", "color", "author", "createdAt"]}], attributes:["id", "username"]});

        if (userData) {
            return res.json(userData);
        } else {
            res.status(404).json({message: "No such user exists!"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting data - couldn't find Users Notes" })
    }
})

// Share note with User
router.post("/:noteId/shareWith/:userId", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res
            .status(403)
            .json({ isValid: false, msg: "You must be logged in to share a Note!" });
    }
    try{
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const noteData = await Note.findByPk(req.params.noteId);
    
        if(tokenData.id!=noteData.AuthorId){
            return res.status(403).json({message: "You can only share a note that you wrote"})
        }
    
    if(!noteData){
        res.status(404).json({
            message: "No such note exists!"
        })
    } else {
            const sharedNote = await Note.create({
                title:noteData.title,
                textContent:noteData.textContent,
                color:noteData.color,
                author:noteData.author,
                SharedId:req.params.userId,
                isShared:true
            })
    
            if(sharedNote){
                const updatedNote = await Note.update(
                    {isShared:true},
                    {where:{id:req.params.noteId}}
                    )
                if (updatedNote) {
                    return res.json({message: "Note has been shared!"});
                } else {
                    return res.status(404).json({ message: "Record doesn't exist!" });
                }
            }
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
            author:tokenData.username,
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
        return res.status(403).json({ msg: "you must be logged in to edit a Note" });
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
            return res.status(404).json({ msg: "No such Note!" });
        }

        if (foundNote.SharedId !== tokenData.id) {
            return res.status(403).json({ msg: "You can only delete a note that was shared with you!" });
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

module.exports = router;