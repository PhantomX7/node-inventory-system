const {
  Invoice,
  Transaction,
  Customer,
  Product,
  sequelize
} = require("../models");

const getInvoices = async (req, res) => {
  const invoices = await Invoice.findAll({
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
    console.log(req.body);
    const { customerId, date } = req.body;
    const invoice = await Invoice.create({
      customerId,
      date,
      total_capital: 0,
      total_sell_price: 0,
      total_profit: 0,
      payment_status: false
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

module.exports = { getInvoices, addInvoice, getInvoiceById };
