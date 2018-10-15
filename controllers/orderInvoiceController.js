const {
  OrderInvoice,
  OrderTransaction,
  Product,
  sequelize
} = require("../models");

const getOrderInvoices = async (req, res) => {
  const { start, end } = req.query;
  // return res.json({ start, end });
  const orderInvoices = await OrderInvoice.findAll({
    where: {
      date: {
        $between: [start, end]
      }
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  });
  return res.status(200).json({
    orderInvoices
  });
};

const getOrderInvoiceById = async (req, res) => {
  const { id } = req.params;
  const orderInvoice = await OrderInvoice.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    include: [
      {
        model: OrderTransaction,
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {
            model: Product,
            attributes: ["name", "pinyin"]
          }
        ]
      }
    ]
  });

  return res.status(200).json({
    orderInvoice
  });
};

const addOrderInvoice = async (req, res) => {
  try {
    const { payment_status, description, date } = req.body;
    const orderInvoice = await OrderInvoice.create({
      payment_status,
      description,
      date,
      total_buy_price: 0
    });
    return res.status(200).json({
      orderInvoice
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const updateOrderInvoice = async (req, res) => {
  try {
    const { payment_status, description, date } = req.body;
    const orderInvoice = await OrderInvoice.update(
      {
        payment_status,
        description,
        date
      },
      { where: { id: req.params.id } }
    );
    return res.status(200).json({
      orderInvoice
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const deleteOrderInvoice = async (req, res) => {
  try {
    const orderInvoice = await OrderInvoice.findById(req.params.id);
    const orderTransactions = await orderInvoice.getOrderTransactions();
    if (orderTransactions.length > 0) {
      return res.status(400).json({
        error: "Please delete all order transaction"
      });
    }
    await orderInvoice.destroy({ force: true });
    // const invoice = await Invoice.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      orderInvoice
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

module.exports = {
  getOrderInvoices,
  addOrderInvoice,
  getOrderInvoiceById,
  updateOrderInvoice,
  deleteOrderInvoice
};
