const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Platform extends Model{}

Platform.init({
    platform:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{
    sequelize
});

module.exports=Platform