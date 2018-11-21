const {
  ReturnTransaction,
  StockMutation,
  Product,
  Invoice,
  Transaction,
  sequelize
} = require("../models");

const addReturnTransaction = async (req, res) => {
  try {
    const { transactionId, amount } = req.body;
    let transaction;
    await sequelize.transaction(async tx => {
      transaction = await Transaction.findById(transactionId);

      if (await transaction.getReturnTransaction()) {
        throw "Return transaction exist.";
      }
      if (amount > transaction.amount) {
        throw "Amount too much";
      }
      const { productId } = transaction;

      const stockMutation = await StockMutation.create(
        {
          productId,
          amount,
          type: "IN"
        },
        { transaction: tx }
      );
      const currentProduct = await Product.findById(productId);
      const currentStock = currentProduct.stock;
      await Product.update(
        {
          stock: parseInt(currentStock) + parseInt(amount)
        },
        { where: { id: productId }, transaction: tx }
      );
      returnTransaction = await ReturnTransaction.create(
        {
          transactionId,
          amount,
          stockMutationId: stockMutation.id
        },
        { transaction: tx }
      );
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

const updateReturnTransaction = async (req, res) => {
  try {
    const returnTransactionId = req.params.id;
    const { amount } = req.body;
    let returnTransaction = await ReturnTransaction.findById(
      returnTransactionId
    );
    let { transactionId, stockMutationId } = returnTransaction;
    const { productId, invoiceId } = await Transaction.findById(transactionId);

    await sequelize.transaction(async tx => {
      //delete previous data

      await StockMutation.destroy({
        where: { id: stockMutationId },
        transaction: tx
      });

      //save new record

      const stockMutation = await StockMutation.create(
        {
          productId,
          amount,
          type: "IN"
        },
        { transaction: tx }
      );
      currentProduct = await Product.findById(productId);
      currentStock = currentProduct.stock;

      await Product.update(
        {
          stock: currentStock - parseInt(returnTransaction.amount - amount)
        },
        { where: { id: productId }, transaction: tx }
      );

      returnTransaction = await ReturnTransaction.update(
        {
          amount,
          stockMutationId: stockMutation.id
        },
        { where: { id: returnTransactionId }, transaction: tx }
      );
    });
    await updateInvoice(invoiceId);
    return res.status(200).json({
      returnTransaction
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const deleteReturnTransaction = async (req, res) => {
  try {
    const returnTransactionId = req.params.id;
    const returnTransaction = await ReturnTransaction.findById(
      returnTransactionId
    );
    const transaction = await returnTransaction.getTransaction();
    await sequelize.transaction(async tx => {
      await StockMutation.destroy({
        where: { id: returnTransaction.stockMutationId },
        transaction: tx
      });

      const currentProduct = await Product.findById(transaction.productId);
      const currentStock = currentProduct.stock;
      await Product.update(
        {
          stock: currentStock - returnTransaction.amount
        },
        { where: { id: transaction.productId }, transaction: tx }
      );

      await ReturnTransaction.destroy({
        where: { id: returnTransactionId },
        transaction: tx
      });
    });
    await updateInvoice(transaction.invoiceId);
    return res.status(200).json({
      returnTransaction
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
      include: [{ model: Transaction, include: [{ model: ReturnTransaction }] }]
    });
    const { Transactions } = invoice;
    let total_capital = 0;
    let total_sell_price = 0;
    let total_profit = 0;
    Transactions.forEach(
      ({ capital_price, sell_price, amount, ReturnTransaction }) => {
        if (ReturnTransaction) {
          amount -= ReturnTransaction.amount;
        }
        total_capital += capital_price * amount;
        total_sell_price += sell_price * amount;
        total_profit += (sell_price - capital_price) * amount;
      }
    );
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

module.exports = {
  addReturnTransaction,
  updateReturnTransaction,
  deleteReturnTransaction
};
