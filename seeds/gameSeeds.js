const {Game} = require('../models');
const gameData = [
    {
        title: 'Cat Quest II',
        publisher: 'Kepler Interactive',
        releaseDate: '10/23/2019',
        UserId: 1,
    },
    {
        title: 'Cyberpunk 2077',
        publisher: 'CD Projekt RED',
        releaseDate: '12/9/2020',
        UserId: 2,
    },
    {
        title: 'Fruit Ninja',
        publisher: 'Halfbrick Studios',
        releaseDate: '4/21/2010',
        UserId: 3,
    }
]

const seedGame = () => Game.bulkCreate(gameData);

module.exports = seedGame;