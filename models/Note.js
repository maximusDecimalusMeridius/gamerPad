const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model { }

Note.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    textContent: {
        type: DataTypes.TEXT
    },
    color: {
        type: DataTypes.STRING
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    isShared:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
}, {
    sequelize
});

module.exports = Note;