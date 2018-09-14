const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    pinyin: {
      type: String
    },
    image_url: {
      type:String
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Out of Stock"]
    },
    unit: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price_capital: {
      type: Number,
      required: true
    },
    sell_price_credit: {
      type: Number,
      required: true
    },
    sell_price_cash: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
