const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class User extends Model { }

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isAlphanumeric: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            validatePassword: function (password) {
                if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/.test(password))) {
                    throw new Error('The password must contain at least 8 and maximum 128 characters including at least 1 uppercase, 1 lowercase, one number and one special character.');
                }
            }
        },
    },
    lookingForFriends: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    friendCode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Bananas"
    },
    Theme: {
        type: DataTypes.STRING,
        defaultValue: `light`,
    },
    profilePicture: {
        type: DataTypes.STRING,
        defaultValue: 'https://placekitten.com/200/200'
    },
}, {
    sequelize,
    hooks: {
        beforeCreate: userObj => {
            userObj.password = bcrypt.hashSync(userObj.password, 4);
            return userObj;
        }
    }
});

module.exports = User;