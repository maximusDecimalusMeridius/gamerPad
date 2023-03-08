const {User} = require('../models');
const userData = [
    {
        username: `CoolKat83`,
        email: `ILikeCats@everykindof.cat`,
        password: `Herek1ttyk1tty!!!`,
        lookingForFriends: true,
        friendCode: `duh, it's cats`,
        Theme: `light`,
        profilePicture: `http://placekitten.com/200/200`,
    },
    {
        username: `BillyBadMan`,
        email: `TermaniallyHip@cool.na`,
        password: `Yolo4L!fe`,
        lookingForFriends: false,
        friendCode: `frick'm'cool`,
        Theme: `dark`,
        profilePicture: `http://placekitten.com/200/200`,
    },
    {
        username: `ChillCucumber76`,
        email: `veggiegirl@chomp.yum`,
        password: `veggilicous`,
        lookingForFriends: true,
        friendCode: `crunchandmuch`,
        Theme: `light`,
        profilePicture: `http://placekitten.com/200/200`,
    },
]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;