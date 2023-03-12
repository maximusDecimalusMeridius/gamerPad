//loop in dependencies
const express = require("express");
const router = express.Router();
const { Game, User, UserGame, Platform, Account, UserGamePlatform } = require("../models");
const jwt = require("jsonwebtoken");
const fs = require(`fs`);
const dataArray = [];
const sequelize = require('sequelize');

//GET all records
router.get("/", async (req, res) => {
    try {
        const results = await Game.findAll();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all games!" });
    }
});

// GET all usergame info
router.get("/usergame/allUserGames", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to add UserGame" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const userGamesData = await Game.findAll({
            include:[
                {model:UserGame}
            ]
        });
        const userFriends = await User.findByPk(tokenData.id, {include:
            {
                model:User, 
                as: 'Friends', 
                foreignKey: 'FriendId',
            }
        })
        const infoArr = []
        const friendArr = []
        userFriends.Friends.forEach(friend => {
            friendArr.push(friend.id)
        })
        userGamesData.forEach(game => {
            let friends = 0

            game.UserGames.forEach(userGame => {
                if(friendArr.includes(userGame.UserId)){
                    friends++
                }
            })

            const gameData = {
                id:game.id,
                title:game.title,
                publisher:game.publisher,
                allPlayers:game.UserGames.length,
                friendsWhoPlay:friends
            }
            if(game.UserGames.length>0){
                infoArr.push(gameData)
            }
        })
        res.json(infoArr);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all userGames!" });
    }
});

// GET all platforms
router.get("/allPlatforms", async (req, res) => {
    try {
        const results = await Platform.findAll();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all platforms!" });
    }
});

// GET a platform and their UserGames
router.get("/allPlatforms/:id", async (req, res) => {
    try {
        const results = await Platform.findByPk(req.params.id,
            {include:
                [{model:UserGame, attributes:[["id", "UserGameId"]], include:[
                    {model:User, attributes:["id", "username"]}, 
                    {model:Game, attributes:["id", "title"]}
                ]}]
            });
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting all platforms and their UserGames!" });
    }
});

router.post("/usergame", async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to add UserGame" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const newUserGame = await UserGame.create({
            favorite: req.body.favorite,
            lookingForMore: req.body.lookingForMore,
            content: req.body.content,
            replay: req.body.replay,
            value: req.body.value,
            UserId: tokenData.id,
            GameId: req.body.GameId
        });

        req.body.platforms.forEach(async platform  =>{
            const addPlatform = await newUserGame.addPlatform(platform);
        });

        res.json({msg:'usergame created, and platforms  added'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error adding your game!" });
    }
});

//route to get current users userGames
router.get("/usergame", async (req, res) => {
    //check for token and turn away non logged in users
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to See UserGame" });
    }

    //get games by user id
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        console.log(tokenData)
        const allUserGames = await User.findByPk(tokenData.id, { 
            include: [
                {
                    model: UserGame,
                    include: [
                        {model:Game,  attributes:{exclude:["updatedAt", "createdAt"]}}, 
                        {model:Platform, attributes:{exclude:["createdAt", "updatedAt"]}}
                    ],
                    attributes:{exclude:["updatedAt", "UserId", "GameId"]}
                }
            ],
            attributes:["id", "username"]
        });

        //verify user exists and req,params match logged in user
        if (!allUserGames) {
            return res.status(404).json({ msg: "no such User!" });
        }

        res.json(allUserGames);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting your games!" });
    }
});

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
        res.status(500).json({ message: "Error getting data - Couldn't find game" })
    }
})

// Edit UserGame by Id
router.put("/usergame/:userGameId", async (req, res) => {
    //check for token and turn away non logged in users
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: "you must be logged in to Edit UserGame" });
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const userGameData = await UserGame.findByPk(req.params.userGameId)

        if (!userGameData) {
            return res.status(404).json({ message: "UserGame Edit - Record doesn't exist!" })
        } 

        if (userGameData.UserId != tokenData.id) {
            return res.status(404).json({ message: "You can only edit a UserGame you own!" })
        } 

        const updatedUserGame = await userGameData.update({
            favorite: req.body.favorite,
            lookingForMore: req.body.lookingForMore,
            content: req.body.content,
            replay: req.body.replay,
            value: req.body.value,
            GameId: req.body.GameId
        })

        const allPlatforms = await Platform.findAll()

        allPlatforms.forEach(async platform => {
            const removePlatform = await userGameData.removePlatform(platform.id);
        })


        req.body.platforms.forEach(async platformId => {
            const addPlatform = await userGameData.addPlatform(platformId);
        })

        return res.json({message: "UserGame updated!"})    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error editing record!" });
    }
})


//DELETE a record
router.delete("/usergame/:userGameId", async (req, res) => {
     //check for token and turn away non logged in users
     const token = req.headers?.authorization?.split(" ")[1];
     if (!token) {
         return res.status(403).json({ msg: "you must be logged in to Delete Notes" });
     }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        const userGameData = await UserGame.findByPk(req.params.userGameId)

        if (!userGameData) {
            return res.status(404).json({ message: "UserGame Delete - Record doesn't exist!" })
        } 

        if (userGameData.UserId != tokenData.id) {
            return res.status(404).json({ message: "You can only delete a UserGame you own!" })
        } 

        const deletedData = await userGameData.destroy()

        return res.json({message:"UserGame Deleted"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting record!" });
    }
})

// -------------------------------------------------------------------------------
// Game seeding
// -------------------------------------------------------------------------------

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
                {
                    title: game.name,
                    releaseDate: game.released,
                }
            )
        })
        const makeGames = await Game.bulkCreate(gamesObjs)
        fs.appendFileSync('./db/apiData/ourGameData.json', JSON.stringify(gamesObjs), function (err, data) {
            if (err) {
                return console.log(err);
            } else {
                console.log(data);
                return res.json(data);
            }
        });
    } catch (err) {
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
        if (req.params.page >= 3) {
            writeFile(dataArray);
        }
        res.json({ msg: `wtf` });
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching games!" })
    }
});

const writeFile = (data) => {
    fs.appendFileSync('./db/apiData/rawgDataJSON.json', JSON.stringify(data), (err) =>
        err ? console.error(err) : console.log('Success!'));

    return;
}

module.exports = router;