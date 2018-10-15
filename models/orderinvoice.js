"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderInvoice = sequelize.define(
    "OrderInvoice",
    {
      total_buy_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: { min: 0, isDecimal: true }
      },
      payment_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      description: { type: DataTypes.STRING },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    { timestamps: true }
  );
  OrderInvoice.associate = function(models) {
    OrderInvoice.hasMany(models.OrderTransaction, {
      foreignKey: "orderInvoiceId"
    });
  };
  return OrderInvoice;
};
