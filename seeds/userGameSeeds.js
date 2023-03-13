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
        },
        {
            favorite: false,
            lookingForMore: false,
            content: 0,
            value: 0,
            replay: 0,
            UserId: 7,
            GameId: 10,
        },
        {
            favorite: true,
            lookingForMore: true,
            content: 5,
            value: 5,
            replay: 5,
            UserId: 6,
            GameId: 10,
        },
        {
            favorite: true,
            lookingForMore: true,
            content: 5,
            value: 4,
            replay: 5,
            UserId: 3,
            GameId: 1,
        },
        {
            favorite: true,
            lookingForMore: false,
            content: 5,
            value: 4,
            replay: 3,
            UserId: 5,
            GameId: 2,
        },
        {
            favorite: false,
            lookingForMore: false,
            content: 1,
            value: 3,
            replay: 1,
            UserId: 4,
            GameId: 7,
        },
        {
            favorite: false,
            lookingForMore: true,
            content: 1,
            value: 2,
            replay: 4,
            UserId: 2,
            GameId: 6,
        },
        {
            favorite: false,
            lookingForMore: false,
            content: 4,
            value: 3,
            replay: 4,
            UserId: 2,
            GameId: 10,
        },
    ])

    await userGameData[0].addPlatform(8)
    await userGameData[0].addPlatform(27)
    await userGameData[1].addPlatform(27)
    await userGameData[2].addPlatform(8)
    await userGameData[3].addPlatform(0)
    await userGameData[4].addPlatform(13)
    await userGameData[5].addPlatform(4)
    // await userGameData[6].addPlatform(5)
    // await userGameData[7].addPlatform(7)
    // await userGameData[8].addPlatform(19)
    // await userGameData[9].addPlatform(21)
}
module.exports = UserGamePlatform;