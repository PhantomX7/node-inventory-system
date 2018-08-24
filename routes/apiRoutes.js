const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", (req, res) => {
  console.log(User);
  res.json({ nama: "celine" });
});

module.exports = router;
