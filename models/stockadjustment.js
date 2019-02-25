"use strict";
module.exports = (sequelize, DataTypes) => {
  const StockAdjustment = sequelize.define(
    "StockAdjustment",
    {
      productId: { type: DataTypes.INTEGER, allowNull: false },
      amount: {
        type: DataTypes.DOUBLE,
        validate: { min: 0, isDecimal: true },
        allowNull: false
      },
      description: { type: DataTypes.STRING }
    },
    { timestamps: true }
  );
  StockAdjustment.associate = function(models) {
    // associations can be defined here
    StockAdjustment.belongsTo(models.Product, { foreignKey: "productId" });
  };
  return StockAdjustment;
};
