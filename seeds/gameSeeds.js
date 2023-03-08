const {Game} = require('../models');
const gameData = [
    {
        title: 'Cat Quest II',
        publisher: 'Kepler Interactive',
        releaseDate: '10/23/2019'
    }
]

const seedGame = () => Game.bulkCreate(gameData);

module.exports = seedGame;