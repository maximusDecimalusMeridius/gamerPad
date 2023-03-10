const {UserGame} = require('../models');
const userGameData = [
    {
        favorite: true,
        lookingForMore: true,
        content: 10,
        value: 10,
        replay: 100,
        UserId: 1,
        AccountId: 1,
        PlatformId: 1,
        GameId: 1,
    }
]

const seedUserGame = () => UserGame.bulkCreate(userGameData);

module.exports = seedUserGame;