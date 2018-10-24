const {
  OrderTransaction,
  StockMutation,
  Product,
  OrderInvoice,
  sequelize
} = require("../models");

const addOrderTransaction = async (req, res) => {
  try {
    const { orderInvoiceId, productId, buy_price, amount } = req.body;
    const total_buy_price = buy_price * amount;
    let transaction;
    await sequelize.transaction(async tx => {
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
      const orderInvoice = await OrderInvoice.findById(orderInvoiceId);
      orderTransaction = await OrderTransaction.create(
        {
          orderInvoiceId,
          productId,
          buy_price,
          total_buy_price,
          amount,
          stockMutationId: stockMutation.id,
          date: orderInvoice.date
        },
        { transaction: tx }
      );
    });
    await updateOrderInvoice(orderInvoiceId);
    return res.status(200).json({
      orderTransaction
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const updateOrderTransaction = async (req, res) => {
  try {
    const orderTransactionId = req.params.id;
    const { buy_price, amount } = req.body;
    let orderTransaction = await OrderTransaction.findById(orderTransactionId);
    let { orderInvoiceId, productId } = orderTransaction;

    await sequelize.transaction(async tx => {
      //delete previous data

      await StockMutation.destroy({
        where: { id: orderTransaction.stockMutationId },
        transaction: tx
      });

      //save new record
      const total_buy_price = buy_price * amount;

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
          stock: currentStock - parseInt(orderTransaction.amount - amount)
        },
        { where: { id: productId }, transaction: tx }
      );

      orderTransaction = await OrderTransaction.update(
        {
          buy_price,
          total_buy_price,
          amount,
          stockMutationId: stockMutation.id
        },
        { where: { id: orderTransactionId }, transaction: tx }
      );
    });
    await updateOrderInvoice(orderInvoiceId);
    return res.status(200).json({
      orderTransaction
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const deleteOrderTransaction = async (req, res) => {
  try {
    const orderTransactionId = req.params.id;
    const orderTransaction = await OrderTransaction.findById(
      orderTransactionId
    );
    await sequelize.transaction(async tx => {
      await StockMutation.destroy({
        where: { id: orderTransaction.stockMutationId },
        transaction: tx
      });

      const currentProduct = await Product.findById(orderTransaction.productId);
      const currentStock = currentProduct.stock;
      await Product.update(
        {
          stock: currentStock - orderTransaction.amount
        },
        { where: { id: orderTransaction.productId }, transaction: tx }
      );

      const deletedOrderTransaction = await OrderTransaction.destroy({
        where: { id: orderTransactionId },
        transaction: tx
      });
    });
    await updateOrderInvoice(orderTransaction.orderInvoiceId);
    return res.status(200).json({
      orderTransaction
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const updateOrderInvoice = async orderInvoiceId => {
  await sequelize.transaction(async tx => {
    const orderInvoice = await OrderInvoice.findOne({
      where: { id: orderInvoiceId },
      include: [{ model: OrderTransaction }]
    });
    const { OrderTransactions } = orderInvoice;
    let total_buy_price = 0;
    OrderTransactions.forEach(({ buy_price, amount }) => {
      total_buy_price += buy_price * amount;
    });
    await OrderInvoice.update(
      {
        total_buy_price
      },
      { where: { id: orderInvoiceId }, transaction: tx }
    );
  });
};

module.exports = {
  addOrderTransaction,
  updateOrderTransaction,
  deleteOrderTransaction
};
