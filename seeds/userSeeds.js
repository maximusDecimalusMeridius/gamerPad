const { User } = require('../models');
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
            username: `ChillCucumber76`,
            email: `veggiegirl@chomp.yum`,
            password: `Veggil1cous?`,
            lookingForFriends: true,
            friendCode: `crunchandmuch`,
            Theme: `light`,
            profilePicture: `http://placekitten.com/200/200`,
        },
        {
            username: `KaiInTheSky`,
            email: `beetlejuice@music.man`,
            password: `W1thD!amonds`,
            lookingForFriends: true,
            friendCode: `EleanorRigby`,
            Theme: `dark`,
            profilePicture: `http://placekitten.com/200/200`,
        },
        {
            username: `AndyBDandy`,
            email: `rhymetime@why.me`,
            password: `2Thef!nish`,
            lookingForFriends: true,
            friendCode: `GTAallTheway`,
            Theme: `dark`,
            profilePicture: `http://placekitten.com/200/200`,
        },
        {
            username: `TarotDaro`,
            email: `themagician@witchy.boo`,
            password: `Puta5pe!!onYou`,
            lookingForFriends: true,
            friendCode: `ThemePink`,
            Theme: `light`,
            profilePicture: `http://placekitten.com/200/200`,
        },
        {
            username: `Blockhead`,
            email: `falsy@fake.lie`,
            password: `!5@Bl0ckM@n`,
            lookingForFriends: true,
            friendCode: `Bits&Pieces`,
            Theme: `dark`,
            profilePicture: `http://placekitten.com/200/200`,
        },
        {
            username: `LumberJack08`,
            email: `longlostone@boo.who`,
            password: `Yub@Du6Du6`,
            lookingForFriends: false,
            friendCode: `OnceUponATime`,
            Theme: `light`,
            profilePicture: `http://placekitten.com/200/200`,
        },
        {
            username: `SlickBud20`,
            email: `iwearmysunglassesatnight@soi.can`,
            password: `Thr0w@F1t`,
            lookingForFriends: true,
            friendCode: `Ibe2point5`,
            Theme: `light`,
            profilePicture: `http://placekitten.com/200/200`,
        },
        {
            username: `UckyDu23`,
            email: `onewiththefuss@wah.cry`,
            password: `@llDame55e5`,
            lookingForFriends: true,
            friendCode: `IB@ba6EE`,
            Theme: `dark`,
            profilePicture: `http://placekitten.com/200/200`,
        },
        {
            username: `MoonBird91`,
            email: `secretnerd@iwin.now`,
            password: `M@rche5a`,
            lookingForFriends: true,
            friendCode: `IhateBlue`,
            Theme: `light`,
            profilePicture: `http://placekitten.com/200/200`,
        },
    ], {
        validate: true,
        individualHooks: true
    })

    await users[0].addUser(users[1])
    await users[1].addUser(users[0])
    await users[0].addUser(users[2])
    await users[2].addUser(users[0])
    await users[5].addUser(users[9])
    await users[9].addUser(users[5])
    await users[4].addUser(users[2])
    await users[2].addUser(users[4])
    await users[3].addUser(users[0])
    await users[0].addUser(users[3])
}

module.exports = seedUser;