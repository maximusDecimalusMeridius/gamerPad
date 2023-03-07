const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');
const bcrypt = require("bcrypt")

class User extends Model { }

User.init({
    // add properites here, ex:
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // validate: {
        //     isAlphanumeric: true
        // }
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
            len: [8]
        }
    }
    lookingForFriends: {
        type: DataTypes.BOOLEAN,
        
    }
}, {
    sequelize,
    hooks: {
        beforeCreate: userObj => {
            userObj.password = bcrypt.hashSync(userObj.password, 4);
            return userObj;
        }
    }
});

module.exports = User