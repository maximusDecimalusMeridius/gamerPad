const {Platform} = require('../models');
const platformData = [
    {
        platform: 'Xbox',
        GameId: 1,
        UserGameId: 1,
    },
    {
        platform: 'Playstation',
        GameId: 2,
        UserGameId: 2,
    },
    {
        platform: 'Discord',
        GameId: 3,
        UserGameId: 3,
    }
]

const seedPlatform = () => Platform.bulkCreate(platformData);

module.exports = seedPlatform;