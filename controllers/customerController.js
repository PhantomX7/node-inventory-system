const { Customer, sequelize } = require("../models");

const getCustomers = async (req, res) => {
  const customers = await Customer.findAll();
  return res.status(200).json({
    customers
  });
};

const addCustomer = async (req, res) => {
  // return res.json({ tes: req.body });
  try {
    const customer = await Customer.create(req.body);
    return res.status(200).json({
      customer
    });
  } catch (err) {
    return res.status(400).json({
      error: err
    });
  }
};
const updateCustomer = async (req, res) => {};

module.exports = { getCustomers, addCustomer, updateCustomer };
