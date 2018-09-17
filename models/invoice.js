"use strict";
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    "Invoice",
    {
      customerId: { type: DataTypes.INTEGER, allowNull: false },
      image_url: { type: DataTypes.STRING },
      total_capital: {
        type: DataTypes.DOUBLE,
        validate: { min: 0, isDecimal: true },
        allowNull: false
      },
      total_sell_price: {
        type: DataTypes.DOUBLE,
        validate: { min: 0, isDecimal: true },
        allowNull: false
      },
      payment_status: { type: DataTypes.BOOLEAN, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false }
    },
    { timestamps: true }
  );
  Invoice.associate = function(models) {
    Invoice.belongsTo(models.Customer, { foreignKey: "customerId" });
  };
  return Invoice;
};
