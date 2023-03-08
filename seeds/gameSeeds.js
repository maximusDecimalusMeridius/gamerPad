const {Game} = require('../models');
const gameData = [
    {
        
    }
]

const seedGame = () => Game.bulkCreate(gameData);

module.exports = seedGame;