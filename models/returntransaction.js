"use strict";
module.exports = (sequelize, DataTypes) => {
  const ReturnTransaction = sequelize.define(
    "ReturnTransaction",
    {
      transactionId: { type: DataTypes.INTEGER, allowNull: false },
      amount: { type: DataTypes.INTEGER, allowNull: false },
      stockMutationId: { type: DataTypes.INTEGER, allowNull: false }
    },
    { timestamps: true }
  );
  ReturnTransaction.associate = function(models) {
    // associations can be defined here
    ReturnTransaction.belongsTo(models.Transaction, { foreignKey: "transactionId" });
    ReturnTransaction.belongsTo(models.StockMutation, { foreignKey: "stockMutationId" });
  };
  return ReturnTransaction;
};
