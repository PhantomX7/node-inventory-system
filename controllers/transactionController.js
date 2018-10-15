const {
  Transaction,
  StockMutation,
  Product,
  Invoice,
  sequelize
} = require("../models");

const addTransaction = async (req, res) => {
  try {
    const {
      invoiceId,
      productId,
      capital_price,
      sell_price,
      amount
    } = req.body;
    const total_sell_price = sell_price * amount;
    const total_capital = capital_price * amount;
    const profit = total_sell_price - total_capital;
    let transaction;
    await sequelize.transaction(async tx => {
      const stockMutation = await StockMutation.create(
        {
          productId,
          amount,
          type: "OUT"
        },
        { transaction: tx }
      );
      const currentProduct = await Product.findById(productId);
      const currentStock = currentProduct.stock;
      await Product.update(
        {
          stock: currentStock - amount
        },
        { where: { id: productId }, transaction: tx }
      );
      const invoice = await Invoice.findById(invoiceId);
      transaction = await Transaction.create(
        {
          invoiceId,
          productId,
          capital_price,
          sell_price,
          total_sell_price,
          profit,
          amount,
          stockMutationId: stockMutation.id,
          date: invoice.date
        },
        { transaction: tx }
      );
    });
    await updateInvoice(invoiceId);
    return res.status(200).json({
      transaction
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { capital_price, sell_price, amount } = req.body;
    let transaction = await Transaction.findById(transactionId);
    let { invoiceId, productId } = transaction;

    await sequelize.transaction(async tx => {
      //delete previous data

      await StockMutation.destroy({
        where: { id: transaction.stockMutationId },
        transaction: tx
      });

      //save new record
      const total_sell_price = sell_price * amount;
      const total_capital = capital_price * amount;
      const profit = total_sell_price - total_capital;

      const stockMutation = await StockMutation.create(
        {
          productId,
          amount,
          type: "OUT"
        },
        { transaction: tx }
      );
      currentProduct = await Product.findById(productId);
      currentStock = currentProduct.stock;

      await Product.update(
        {
          stock: currentStock + (transaction.amount - amount)
        },
        { where: { id: productId }, transaction: tx }
      );

      transaction = await Transaction.update(
        {
          capital_price,
          sell_price,
          total_sell_price,
          profit,
          amount,
          stockMutationId: stockMutation.id
        },
        { where: { id: transactionId }, transaction: tx }
      );
    });
    await updateInvoice(invoiceId);
    return res.status(200).json({
      transaction
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findById(transactionId);
    await sequelize.transaction(async tx => {
      await StockMutation.destroy({
        where: { id: transaction.stockMutationId },
        transaction: tx
      });

      const currentProduct = await Product.findById(transaction.productId);
      const currentStock = currentProduct.stock;
      await Product.update(
        {
          stock: currentStock + transaction.amount
        },
        { where: { id: transaction.productId }, transaction: tx }
      );

      const deletedTransaction = await Transaction.destroy({
        where: { id: transactionId },
        transaction: tx
      });
    });
    await updateInvoice(transaction.invoiceId);
    return res.status(200).json({
      transaction
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const updateInvoice = async invoiceId => {
  await sequelize.transaction(async tx => {
    const invoice = await Invoice.findOne({
      where: { id: invoiceId },
      include: [{ model: Transaction }]
    });
    const { Transactions } = invoice;
    let total_capital = 0;
    let total_sell_price = 0;
    let total_profit = 0;
    Transactions.forEach(({ capital_price, sell_price, amount, profit }) => {
      total_capital += capital_price * amount;
      total_sell_price += sell_price * amount;
      total_profit += profit;
    });
    await Invoice.update(
      {
        total_capital,
        total_sell_price,
        total_profit
      },
      { where: { id: invoiceId }, transaction: tx }
    );
  });
};

module.exports = { addTransaction, updateTransaction, deleteTransaction };
