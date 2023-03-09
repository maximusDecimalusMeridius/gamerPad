const {User} = require('../models');
const seedUser = async () => {
    const users = await User.bulkCreate([
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
        password: `Veggil1cous?`,
        lookingForFriends: true,
        friendCode: `crunchandmuch`,
        Theme: `light`,
        profilePicture: `http://placekitten.com/200/200`,
    },
],{
    validate:true,
    individualHooks:true
  })
}

module.exports = seedUser;