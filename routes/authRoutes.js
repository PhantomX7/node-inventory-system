const express = require("express");
const router = express.Router();
const { signin, signup, getRoles } = require("../controllers/authController");

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/role", getRoles);
router.post("/roleseed", (req, res) => {
  require("../seeds/roleSeed")();
  res.json({ message: "ok" });
});
router.post("/productseed", (req, res) => {
  require("../seeds/productSeed")();
  res.json({ message: "ok" });
});

module.exports = router;
