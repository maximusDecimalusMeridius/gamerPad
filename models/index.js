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

//UserGame Associations
User.hasMany(UserGame)
UserGame.belongsTo(User);
Game.hasOne(UserGame);
UserGame.belongsToMany(Platform, {through: "UserGamePlatform"});
Platform.belongsToMany(UserGame, {through: "UserGamePlatform"});

module.exports = {
    User,
    UserFriend,
    Note,
    Account,
    UserGame,
    Game,
    Platform
}