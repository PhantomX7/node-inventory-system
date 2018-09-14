const mongoose = require("mongoose");

const trsnsactionSchema = new mongoose.Schema(
  {
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice"
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    capital_price: {
      type: Number,
      required: true
    },
    sell_price: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    profit: {
      type: Number,
      required: true
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

const Transaction = mongoose.model("Transaction", trsnsactionSchema);

module.exports = Transaction;
