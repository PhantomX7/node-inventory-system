const express = require("express");
const router = express.Router();
const { User } = require("../models");
const {
  getProducts,
  addProduct,
  updateProduct
} = require("../controllers/productController");
const {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customerController");
const {
  getInvoices,
  addInvoice,
  getInvoiceById
} = require("../controllers/invoiceController");
const {
  addTransaction,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactionController");
const { getMe } = require("../controllers/authController");

router.get("/me", getMe);

//product routes
router.get("/product", getProducts);
router.post("/product", addProduct);
router.put("/product/:id", updateProduct);

//customer routes
router.get("/customer", getCustomers);
router.post("/customer", addCustomer);
router.put("/customer/:id", updateCustomer);
router.delete("/customer/:id", deleteCustomer);

//invoice routes
router.get("/invoice", getInvoices);
router.post("/invoice", addInvoice);
router.get("/invoice/:id", getInvoiceById);

//transaction routes
router.post("/transaction", addTransaction);
router.put("/transaction/:id", updateTransaction);
router.delete("/transaction/:id", deleteTransaction);

module.exports = router;
