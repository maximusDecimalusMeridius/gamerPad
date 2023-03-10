const {UserGame, Platform} = require('../models');

const UserGamePlatform = async () => {
    const platformData = await Platform.bulkCreate([
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
    ]);
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