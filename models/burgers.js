//This file will export a function that returns a sequelized "Burger" object representation of a mysql table that will end up being called "burgers" 
module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    name: {
      type: DataTypes.STRING,
      // can't be empty . . .
      allowNull: false,
      // ... and must have at least 3 characters
      validate: {
        len: [3]
      }
    },
    devoured: {
      // is it eaten or not? this is boolean
      type: DataTypes.BOOLEAN,
      allowNull: false,
      // default value for devoured is set to false
      defaultValue: false
    }
  },
  {
    classMethods: {
      associate: function(models){
        Burger.belongsTo(models.Customer, {
          foreignKey: {
            allowNull: false
          }
        })
    }
  }
  }
  );
  return Burger;
};