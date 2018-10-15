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

module.exports = { addOrderTransaction };
