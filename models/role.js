"use strict";
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      name: { type: DataTypes.STRING, allowNull: false }
    },
    { timestamps: true }
  );
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.User, { foreignKey: "roleId" });
  };
  return Role;
};
