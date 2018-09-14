const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      ref: "Product"
    },
    total_capital: {
      type: Number,
      required: true
    },
    total_sell_price: {
      type: Number,
      required: true
    },
    payment_status: {
      type: String,
      required:true
    }
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

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
