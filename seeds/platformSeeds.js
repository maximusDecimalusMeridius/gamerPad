const {Platform} = require('../models');
const platformData = [
    {
        GameId: 1,
        AccountId: 1,
        UserId: 1,
    }
]

const seedPlatform = () => Platform.bulkCreate(platformData);

module.exports = seedPlatform;