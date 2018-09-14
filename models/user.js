"use strict";
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      roleID: DataTypes.INTEGER
    },
    {
      timestamps: true,
      hooks: {
        beforeCreate: async (user, options, cb) => {
          let hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        }
      }
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Role, { foreignKey: "roleID" });
  };

  User.prototype.comparePassword = async function(candidatePassword) {
    let isMatch = await bcrypt.compare(
      candidatePassword,
      this.getDataValue("password")
    );
    return isMatch;
  };
  
  return User;
};
