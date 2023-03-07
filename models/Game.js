const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Game extends Model{}

Game.init({
    title:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    publisher:{
        type: DataTypes.STRING,
        default: 'Unknown'
    },
    realeaseDate:{
        type: DataTypes.DATE,
        allowNull:true
    }
},{
    sequelize
});

module.exports=Game