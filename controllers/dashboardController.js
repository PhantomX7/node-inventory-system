const moment = require("moment");
const {
  Invoice,
  Transaction,
  Customer,
  Product,
  ReturnTransaction,
  sequelize
} = require("../models");

const getOverallMonthlyStatistic = async (req, res) => {
  const { month, year } = req.query;

  const startdate = moment(`${year}-${month}-01`);

  const income = await Invoice.sum("total_profit", {
    where: {
      date: {
        $between: [
          startdate.startOf("month").format("YYYY-MM-DD"),
          startdate.endOf("month").format("YYYY-MM-DD")
        ]
      }
    }
  });
  res.status(200).json({
    income
  });
};

const getInvoiceMonthlyReport = async (req, res) => {
  const { month, year } = req.query;

  const startdate = moment(`${year}-${month}-01`);
  // return res.json({ start, end });
  const invoices = await Invoice.findAll({
    where: {
      date: {
        $between: [
          startdate.startOf("month").format("YYYY-MM-DD"),
          startdate.endOf("month").format("YYYY-MM-DD")
        ]
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

module.exports = {
  getInvoiceMonthlyReport,
  getOverallMonthlyStatistic
};
