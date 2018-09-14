const mongoose = require("mongoose");
const User = require("./user");

const roleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      maxLength: 20
    }
  },
  {
    timestamps: true
  }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
