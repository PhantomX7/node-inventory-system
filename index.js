const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("express-jwt");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");

require("dotenv").config();

// const url = process.env.DATABASEURL || "mongodb://localhost/pos";
// mongoose.connect(
//   url,
//   { useNewUrlParser: true }
// );

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const auth = jwt({
  secret: process.env.JWT_SECRET
});

app.use("/auth", authRoutes);
app.use("/api", auth, apiRoutes);

app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send(err.message);
  }
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
