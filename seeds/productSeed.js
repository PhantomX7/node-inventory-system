const { Product } = require("../models");

module.exports = async () => {
  await Product.remove({});
  await Product.create({ name: "test1", stock:2, price_capital:1000000 });
  await Product.create({ name: "花", stock:4, price_capital:2000000 });
};
