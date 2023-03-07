const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Account extends Model{}

Account.init({
    account:{
        type: DataTypes.STRING,
        allowNull:false
    },
    type:{
        type: DataTypes.STRING,
        allowNull:false
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false
    },
    gamerTag:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize
});

module.exports=Account