"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderTransaction = sequelize.define(
    "OrderTransaction",
    {
      orderInvoiceId: { type: DataTypes.INTEGER, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      amount: {
        type: DataTypes.DOUBLE,
        validate: { min: 0, isDecimal: true },
        allowNull: false
      },
      buy_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: { min: 0, isDecimal: true }
      },
      total_buy_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: { min: 0, isDecimal: true }
      },
      stockMutationId: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false }
    },
    { timestamps: true }
  );
  OrderTransaction.associate = function(models) {
    // associations can be defined here
    OrderTransaction.belongsTo(models.Product, { foreignKey: "productId" });
    OrderTransaction.belongsTo(models.OrderInvoice, { foreignKey: "orderInvoiceId" });
    OrderTransaction.belongsTo(models.StockMutation, {
      foreignKey: "stockMutationId"
    });
  };
  return OrderTransaction;
};
