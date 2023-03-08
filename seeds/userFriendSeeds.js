const {UserFriend} = require('../models');
const userFriendData = [
    {
        userId: 1,
        friendId: 3,
        status: `friend`,
    },
    {
        userId: 3,
        friendId: 1,
        status: `friend`,
    },
]

const seedUserFriend = () => UserFriend.bulkCreate(userFriendData);

module.exports = seedUserFriend;