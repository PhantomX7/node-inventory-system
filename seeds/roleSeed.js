const { User, Role } = require("../models");

module.exports = async () => {
  await Role.remove({});
  await Role.create({ role: "admin" });
  await Role.create({ role: "guest" });
};
