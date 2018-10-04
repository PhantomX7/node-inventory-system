"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      pinyin: { type: DataTypes.STRING },
      image_url: { type: DataTypes.STRING },
      stock: {
        type: DataTypes.INTEGER,
        validate: { min: 0, isInt: true },
        allowNull: false
      },
      unit: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      capital_price: {
        type: DataTypes.DOUBLE,
        validate: { min: 0, isDecimal: true },
        allowNull: false
      },
      sell_price_credit: {
        type: DataTypes.DOUBLE,
        validate: { min: 0, isDecimal: true },
        allowNull: false
      },
      sell_price_cash: {
        type: DataTypes.DOUBLE,
        validate: { min: 0, isDecimal: true },
        allowNull: false
      }
    },
    { timestamps: true }
  );
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.StockAdjustment, { foreignKey: "productId" });
    Product.hasMany(models.StockMutation, { foreignKey: "productId" });
    Product.hasMany(models.Transaction, { foreignKey: "productId" });
  };
  return Product;
};
