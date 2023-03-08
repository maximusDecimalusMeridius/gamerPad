const {UserFriend} = require('../models');
const userFriendData = [
    {

    }
]

const seedUserFriend = () => UserFriend.bulkCreate(userFriendData);

module.exports = seedUserFriend;