"use strict";
module.exports = (sequelize, DataTypes) => {
  const StockMutation = sequelize.define(
    "StockMutation",
    {
      productId: { type: DataTypes.INTEGER, allowNull: false },
      amount: { type: DataTypes.INTEGER, allowNull: false },
      type: { type: DataTypes.ENUM, values: ["IN", "OUT"] }
    },
    { timestamps: true }
  );
  StockMutation.associate = function(models) {
    // associations can be defined here
    StockMutation.belongsTo(models.Product, { foreignKey: "productId" });
    StockMutation.hasOne(models.Transaction, { foreignKey: "stockMutationId" });
    StockMutation.hasOne(models.ReturnTransaction, { foreignKey: "stockMutationId" });
    StockMutation.hasOne(models.OrderTransaction, { foreignKey: "stockMutationId" });
  };
  
  return StockMutation;
};
