const {UserGame} = require('../models');
const Platform = require('./platformSeeds');

const UserGamePlatform = async () => {
    const platformData = Platform;
    const userGameData = await UserGame.bulkCreate([
        {
            favorite: true,
            lookingForMore: true,
            content: 10,
            value: 10,
            replay: 100,
            UserId: 1,
            GameId: 1,
        },
        {
            favorite: true,
            lookingForMore: true,
            content: 10,
            value: 10,
            replay: 100,
            UserId: 2,
            GameId: 2,
        },
        {
            favorite: true,
            lookingForMore: true,
            content: 10,
            value: 10,
            replay: 100,
            UserId: 1,
            GameId: 2,
        }
    ])

}
module.exports = UserGamePlatform;