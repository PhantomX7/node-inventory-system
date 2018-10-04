const { Product, StockAdjustment, sequelize } = require("../models");

const getProducts = async (req, res) => {
  const products = await Product.findAll();
  return res.status(200).json({
    products
  });
};

const addProduct = async (req, res) => {
  // return res.json({ tes: req.body });
  try {
    const product = await Product.create(req.body);
    return res.status(200).json({
      product
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const updateProduct = async (req, res) => {
  const {
    name,
    pinyin,
    stock,
    stock_description,
    unit,
    description,
    capital_price,
    sell_price_credit,
    sell_price_cash
  } = req.body;

  const { id } = req.params;

  const currentProduct = await Product.findById(id);
  const currentStock = currentProduct.stock;
  const stockMutation = stock - currentStock;

  await sequelize.transaction(async transaction => {
    if (stock !== currentStock) {
      await StockAdjustment.create(
        {
          productId: id,
          amount: stockMutation,
          description: stock_description
        },
        { transaction }
      );
    }

    await Product.update(
      {
        name,
        pinyin,
        stock,
        unit,
        description,
        capital_price,
        sell_price_credit,
        sell_price_cash
      },
      { where: { id }, transaction }
    );
  });

  const product = await Product.findById(id);

  return res.status(200).json({
    product
  });
};

module.exports = { getProducts, addProduct, updateProduct };
