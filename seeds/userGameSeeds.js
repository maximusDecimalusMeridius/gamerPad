const {UserGame} = require('../models');
const userGameData = [
    {

    }
]

const seedUserGame = () => UserGame.bulkCreate(userFriendGame);

module.exports = seedUserGame;