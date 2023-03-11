const {UserGame, Platform} = require('../models');

const seedPlatforms = async () => {
    const platformData = await Platform.bulkCreate([
        {
            platform: 'PlayStation 2',
        },
        {
            platform: 'Nintendo DS',
        },
        {
            platform: 'Nintendo Switch',
        },
        {
            platform: 'Game Boy',
        },
        {
            platform: 'PlayStation 4',
        },
        {
            platform: 'PlayStation',
        },
        {
            platform: 'Wii',
        },
        {
            platform: 'PlayStation 3',
        },
        {
            platform: 'Xbox 360',
        },
        {
            platform: 'Game Boy Advance',
        },
        {
            platform: 'PlayStation Portable',
        },
        {
            platform: 'Nintendo 3DS',
        },
        {
            platform: 'NES/Famicom',
        },
        {
            platform: 'Xbox One',
        },
        {
            platform: 'SNES/Super Famicom',
        },
        {
            platform: 'Nintendo 64',
        },
        {
            platform: 'Sega Genesis/Mega Drive',
        },
        {
            platform: 'PlayStation 5',
        },
        {
            platform: 'Atari 2600',
        },
        {
            platform: 'Xbox',
        },
        {
            platform: 'GameCube',
        },
        {
            platform: 'Xbox Series X/S',
        },
        {
            platform: 'Wii U',
        },
        {
            platform: 'PlayStation Vita',
        },
        {
            platform: 'Sega Master System',
        },
        {
            platform: 'Mobile',
        },
        {
            platform: 'PC',
        },
        {
            platform: 'HTC Vive',
        },
        {
            platform: 'Oculus',
        },
        {
            platform: 'PlayStation VR',
        },
        {
            platform: 'HoloLens',
        },
        {
            platform: 'Valve Index',
        },
        {
            platform: 'Microsoft HoloLens',
        },
        {
            platform: 'Samsung Odyssey+',
        }
    ])
}
module.exports = seedPlatforms;