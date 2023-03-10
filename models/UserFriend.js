const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserFriend extends Model { }

UserFriend.init({
    blockedStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
}, {
    sequelize
});

module.exports = UserFriend;