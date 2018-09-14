"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: { type: DataTypes.STRING },
      pinyin: { type: DataTypes.STRING },
      image_url: { type: DataTypes.STRING },
      stock: { type: DataTypes.INTEGER },
      unit: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      price_capital: { type: DataTypes.DOUBLE },
      sell_price_credit: { type: DataTypes.DOUBLE },
      sell_price_cash: { type: DataTypes.DOUBLE }
    },
    {}
  );
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
