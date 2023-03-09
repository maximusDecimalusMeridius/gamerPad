//loop in dependencies
const express = require("express");
const router = express.Router();
const {Game, UserGame} = require("../models");
const fs = require(`fs`);
const dataArray = [];

//GET all records
router.get("/", async (req, res) => {
    try {
        const results = await Game.findAll();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all Games!" })
    }
});

router.get("/rawg/create", async (req, res) => {
    try {
        const jsonRaw = fs.readFileSync('./db/apiData/rawgDataJSON.json', 'utf8', (err) =>
        err ? console.error(err) : console.log('Success!'));
        const newJson = await JSON.parse(jsonRaw); 
        let gamesArray = [];
        newJson.forEach(array => {
            gamesArray = gamesArray.concat(array.results);
        });

        const gamesObjs = gamesArray.map(game => {
            return (
                {}
            )
        })

        res.json(jsonRaw);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Error making games!" })
    }
});

//fetch api data from rawg
router.get("/rawg/:page", async (req, res) => {
    try {
        //fetch game data from rawg
        const rawgDataRaw = await fetch(`https://api.rawg.io/api/games?key=${`3cd34fbf61e14893a8511b086b8adee5`}&page=${req.params.page}&page_size=40`);
        const rawgData = await rawgDataRaw.json();

        dataArray.push(rawgData);

        console.log(req.params.page);
        if(req.params.page >= 3){
            writeFile(dataArray);
        }
        res.json({msg:`wtf`});
        return;
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching games!" })
    }
});

const writeFile = (data) => {
    fs.appendFileSync('./db/apiData/rawgDataJSON.json', JSON.stringify(data), (err) =>
        err ? console.error(err) : console.log('Success!'));

    return;
}

//GET one record by id
router.get("/:id", async (req, res) => {
    try {
        const results = await Game.findByPk(req.params.id, {
            include: UserGame
        });

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