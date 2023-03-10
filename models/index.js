const User = require(`./User`);
const UserFriend = require(`./UserFriend`);
const Note = require(`./Note`);
const Account = require(`./Account`);
const UserGame = require(`./UserGame`);
const Game = require(`./Game`);
const Platform = require(`./Platform`);

//Friends relation
// User.belongsToMany(User, { through: UserFriend, as: 'Friend', foreignKey: 'friendId' });
// User.belongsToMany(User, { through: UserFriend, as: 'User', foreignKey: 'userId' });

//Shared Notes and User relation
// Note.belongsToMany(User, { through:'UserNote'});
// User.belongsToMany(Note, {through:'UserNote'});

//Note and User Author relation
User.hasMany(Note, { as: "WritenNotes", foreignKey: "AuthorId"})
Note.belongsTo(User, { as: "Author", foreignKey: "AuthorId"})

//Shared Note and User relation
User.hasMany(Note, { as: "SharedNotes", foreignKey: "SharedId"})
Note.belongsTo(User, { as: "Owner", foreignKey: "SharedId"})

//Account to User relation
Account.hasOne(User);
User.hasMany(Account);

User.hasMany(UserGame);
Account.hasMany(UserGame);
Platform.hasMany(UserGame);
UserGame.belongsTo(User);
UserGame.belongsTo(Account);
UserGame.belongsTo(Platform);
// //User and Platform
// User.belongsToMany(Platform, { through: UserGame });
// Platform.belongsToMany(User, { through: UserGame });

// //Account to Game
// Account.belongsToMany(Game, { through: UserGame });
// Game.belongsToMany(Account, { through: UserGame });

// //Account to Platform relation
// Account.belongsToMany(Platform, { through: UserGame });
// Platform.belongsToMany(Account, { through: UserGame });

// //Game to User
// Game.belongsToMany(User, { through: UserGame});
// User.belongsToMany(Game, { through: UserGame });

// //Game to platform
Game.belongsToMany(Platform, { through: UserGame });
Platform.belongsToMany(Game, { through: UserGame });

module.exports = {
    User,
    UserFriend,
    Note,
    Account,
    UserGame,
    Game,
    Platform
}