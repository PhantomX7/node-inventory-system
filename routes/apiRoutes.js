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
  getInvoiceById,
  updateInvoice,
  deleteInvoice
} = require("../controllers/invoiceController");
const {
  addTransaction,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactionController");
const {
  getOrderInvoices,
  getOrderInvoiceById,
  addOrderInvoice,
  updateOrderInvoice,
  deleteOrderInvoice
} = require("../controllers/orderInvoiceController");
const {
  addOrderTransaction,
  updateOrderTransaction,
  deleteOrderTransaction
} = require("../controllers/orderTransactionController");
const {
  addReturnTransaction,
  updateReturnTransaction,
  deleteReturnTransaction
} = require("../controllers/returnTransactionController");
const {
  getOverallMonthlyStatistic,
  getInvoiceMonthlyReport
} = require("../controllers/dashboardController");
const { getMe } = require("../controllers/authController");

router.get("/me", getMe);

//dashboard routes
router.get("/dashboard/monthlyinvoice", getInvoiceMonthlyReport);
router.get("/dashboard/monthlystatistic", getOverallMonthlyStatistic);

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
router.put("/invoice/:id", updateInvoice);
router.delete("/invoice/:id", deleteInvoice);

//transaction routes
router.post("/transaction", addTransaction);
router.put("/transaction/:id", updateTransaction);
router.delete("/transaction/:id", deleteTransaction);

//order invoice routes
router.get("/orderinvoice", getOrderInvoices);
router.post("/orderinvoice", addOrderInvoice);
router.get("/orderinvoice/:id", getOrderInvoiceById);
router.put("/orderinvoice/:id", updateOrderInvoice);
router.delete("/orderinvoice/:id", deleteOrderInvoice);

//order transaction routes
router.post("/ordertransaction", addOrderTransaction);
router.put("/ordertransaction/:id", updateOrderTransaction);
router.delete("/ordertransaction/:id", deleteOrderTransaction);

//order return routes
router.post("/returntransaction", addReturnTransaction);
router.put("/returntransaction/:id", updateReturnTransaction);
router.delete("/returntransaction/:id", deleteReturnTransaction);

module.exports = router;
