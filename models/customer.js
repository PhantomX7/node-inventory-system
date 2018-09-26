"use strict";
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      address: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING }
    },
    { timestamps: true, paranoid: true }
  );
  Customer.associate = function(models) {
    Customer.hasMany(models.Invoice, { foreignKey: "customerId" });
  };
  return Customer;
};
