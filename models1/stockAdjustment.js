const mongoose = require("mongoose");

const stockAdjustmentSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const StockAdustment = mongoose.model("StockAdustment", stockAdjustmentSchema);

module.exports = StockAdustment;
