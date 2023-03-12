const {Game} = require('../models');
const fs = require('fs');

const pulledGamesRaw = JSON.parse(fs.readFileSync('./db/apiData/devGameData.json'));

const forcedGameSeeds = [
    {
        title: 'Cat Quest II',
        publisher: 'Kepler Interactive',
        releaseDate: '10/23/2019',
        UserId: 1,
        UserGameId: 1,
    },
    {
        title: 'Fruit Ninja',
        publisher: 'Halfbrick Studios',
        releaseDate: '4/21/2010',
        UserId: 3,
        UserGameId: 1,
    }
]

const gameData = pulledGamesRaw.concat(forcedGameSeeds)

const seedGame = () => Game.bulkCreate(gameData);

module.exports = seedGame;