const mongoose = require("mongoose");

const stockMutationSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    amount: {
      type: Number,
      required: true
    },
    // IN or OUT
    type: {
      type: String,
      required: true
    },
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction"
    },
    date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const StockMutation = mongoose.model("StockMutation", stockMutationSchema);

module.exports = StockAdustment;
