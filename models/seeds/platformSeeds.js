const {Platform} = require('../models');
const platformData = [
    {
        platform: 'Xbox',
        GameId: 1,
        UserGameAccountId: 1,
        UserGameUserId: 1,
    },
    {
        platform: 'Playstation',
        GameId: 2,
        UserGameAccountId: 2,
        UserGameUserId: 2,
    },
    {
        platform: 'Discord',
        GameId: 3,
        UserGameAccountId: 3,
        UserGameUserId: 3,
    }
]

const seedPlatform = () => Platform.bulkCreate(platformData);

module.exports = seedPlatform;