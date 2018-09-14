const express = require("express");
const router = express.Router();
const { User } = require("../models");
const {
  getProducts,
  addProduct,
  updateProduct
} = require("../controllers/productController");
const { getMe } = require("../controllers/authController");

router.get("/", (req, res) => {
  console.log(User);
  res.json({ nama: "celine" });
});
router.get("/me", getMe);

//product routes
// router.get("/product", getProducts);
// router.post("/product", addProduct);
// router.post("/product/:id", updateProduct);

module.exports = router;
