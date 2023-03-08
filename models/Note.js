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
    }
}, {
    sequelize
});

module.exports = Note;