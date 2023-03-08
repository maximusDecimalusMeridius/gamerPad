const {UserFriend} = require('../models');
const userFriendData = [
    {
        Friend: 1,
        User: 1,
    }
]

const seedUserFriend = () => UserFriend.bulkCreate(userFriendData);

module.exports = seedUserFriend;