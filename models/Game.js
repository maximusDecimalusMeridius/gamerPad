const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Game extends Model { }

Game.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    publisher: {
        type: DataTypes.STRING,
        default: 'Unknown'
    },
    images: {
        type: DataTypes.STRING,
        default: 'Unknown'
    },
    //make this a standardized date format using dayjs
    releaseDate: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize
});

module.exports = Game