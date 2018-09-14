const { Product, StockAdustment } = require("../models");

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
    stock,
    stock_description,
    unit,
    description,
    price_capital,
    sell_price_credit,
    sell_price_cash
  } = req.body;

  const { id } = req.params;

  const currentProduct = await Product.findById(id);
  const currentStock = currentProduct.stock;
  const stockMutation = stock - currentStock;
  if (stock !== currentStock) {
    await StockAdustment.create({
      product_id: id,
      amount: stockMutation,
      description: stock_description
    });
  }

  const product = await Product.findByIdAndUpdate(
    id,
    {
      name,
      pinyin,
      stock,
      unit,
      description,
      price_capital,
      sell_price_credit,
      sell_price_cash
    },
    { runValidators: true }
  );
  return res.status(200).json({
    product
  });
};

module.exports = { getProducts, addProduct, updateProduct };
