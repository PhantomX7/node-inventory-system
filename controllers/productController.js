const { Product } = require("../models");

const getProducts = async (req, res) => {
  const products = await Product.find(
    {},
    { createdAt: 0, updatedAt: 0, __v: 0 }
  ).exec();
  return res.status(200).json({
    products
  });
};

const addProduct = async (req, res) => {
  // return res.json({ tes: req.body });
  const product = await Product.create(req.body);
  return res.status(200).json({
    product
  });
};

const updateProduct = async (req, res) => {
  const {
    name,
    pinyin,
    unit,
    description,
    price_capital,
    sell_price_credit,
    sell_price_cash
  } = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id, {
    name,
    pinyin,
    unit,
    description,
    price_capital,
    sell_price_credit,
    sell_price_cash
  });
};

module.exports = { getProducts, addProduct };
