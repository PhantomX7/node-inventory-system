"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      invoiceId: { type: DataTypes.INTEGER, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      capital_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: { min: 0, isDecimal: true }
      },
      sell_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: { min: 0, isDecimal: true }
      },
      amount: { type: DataTypes.INTEGER, allowNull: false },
      total_sell_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: { min: 0, isDecimal: true }
      },
      profit: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: { min: 0, isDecimal: true }
      },
      stockMutationId: { type: DataTypes.INTEGER, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false }
    },
    { timestamps: true }
  );
  Transaction.associate = function(models) {
    // associations can be defined here
    Transaction.belongsTo(models.Product, { foreignKey: "productId" });
    Transaction.belongsTo(models.Invoice, { foreignKey: "invoiceId" });
    Transaction.belongsTo(models.StockMutation, {
      foreignKey: "stockMutationId"
    });
    Transaction.hasOne(models.ReturnTransaction, { foreignKey: "transactionId" });
  };
  return Transaction;
};
