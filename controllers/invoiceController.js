const {
  Invoice,
  Transaction,
  Customer,
  Product,
  sequelize
} = require("../models");

const getInvoices = async (req, res) => {
  const { start, end } = req.query;
  // return res.json({ start, end });
  const invoices = await Invoice.findAll({
    where: {
      date: {
        $between: [start, end]
      }
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    include: [
      {
        model: Customer,
        paranoid: false,
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      }
    ]
  });
  return res.status(200).json({
    invoices
  });
};

const getInvoiceById = async (req, res) => {
  const { id } = req.params;
  const invoice = await Invoice.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    include: [
      {
        model: Customer,
        paranoid: false,
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      },
      {
        model: Transaction,
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
    invoice
  });
};

const addInvoice = async (req, res) => {
  try {
    const {
      customerId,
      payment_status,
      payment_type,
      description,
      date
    } = req.body;
    const invoice = await Invoice.create({
      customerId,
      payment_status,
      payment_type,
      description,
      date,
      total_capital: 0,
      total_sell_price: 0,
      total_profit: 0
    });
    return res.status(200).json({
      invoice
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const { payment_status, payment_type, description, date } = req.body;
    const invoice = await Invoice.update(
      {
        payment_status,
        payment_type,
        description,
        date
      },
      { where: { id: req.params.id } }
    );
    return res.status(200).json({
      invoice
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    const transactions = await invoice.getTransactions();
    if (transactions.length > 0) {
      return res.status(400).json({
        error: "Please delete all transaction"
      });
    }
    await invoice.destroy({ force: true });
    // const invoice = await Invoice.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      invoice
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};

module.exports = {
  getInvoices,
  addInvoice,
  getInvoiceById,
  updateInvoice,
  deleteInvoice
};
