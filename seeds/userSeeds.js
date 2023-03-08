const {User} = require('../models');
const userData = [
    {
        username: `CoolKat83`,
        email: `ILikeCats@everykindof.cat`,
        password: `Herek1ttyk1tty`,
        lookingForFriends: true,
        friendCode: `duh, it's cats`,
        Theme: `light`,
        profilePicture: `http://placekitten.com/200/200`
    }
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;