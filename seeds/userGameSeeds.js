const {UserGame, Platform} = require('../models');

const UserGamePlatform = async () => {
    const userGameData = await UserGame.bulkCreate([
        {
            favorite: true,
            lookingForMore: true,
            content: 5,
            value: 4,
            replay: 5,
            UserId: 1,
            GameId: 1,
        },
        {
            favorite: true,
            lookingForMore: true,
            content: 5,
            value: 5,
            replay: 5,
            UserId: 2,
            GameId: 2,
        },
        {
            favorite: true,
            lookingForMore: true,
            content: 4,
            value: 3,
            replay: 4,
            UserId: 1,
            GameId: 2,
        }
    ])

    await userGameData[0].addPlatform(8)
    await userGameData[0].addPlatform(27)

    await userGameData[1].addPlatform(27)

    await userGameData[2].addPlatform(8)
}
module.exports = UserGamePlatform;