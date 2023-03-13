const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserGame extends Model { }

UserGame.init({
    favorite: {
        type: DataTypes.BOOLEAN,
        default: false
    },
    lookingForMore: {
        type: DataTypes.BOOLEAN,
        default: false
    },
    content: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    replay: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize
});

module.exports = UserGame