//This file will export a function that returns a sequelized "Burger" object representation of a mysql table that will end up being called "burgers" 
module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    name: {
      type: DataTypes.STRING,
      // can't be empty . . .
      allowNull: false,
      // ... and must have at least 3 characters
      validate: {
        len: [3]
        }
    }
},
{
    // We're saying that we want our Author to have Posts
    classMethods: {
        associate: function(models) {
            // An Author (foreignKey) is required or a Post can't be made
            Customer.hasMany(models.Burger, {
            onDelete: "cascade"
            });
        }
    }
}
);
  return Customer;
};