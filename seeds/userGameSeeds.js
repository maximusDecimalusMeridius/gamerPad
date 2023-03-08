const {UserGame} = require('../models');
const userGameData = [
    {
        favorite: true,
        lookingForMore: true,
        content: 10,
        value: 10,
        replay: 100,
        PlatformId: 1,
        AccountId: 1,
        UserId: 1,
    }
]

const seedUserGame = () => UserGame.bulkCreate(userGameData);

module.exports = seedUserGame;