const {Platform} = require('../models');
const platformData = [
    {

    }
]

const seedPlatform = () => Platform.bulkCreate(platformData);

module.exports = seedPlatform;