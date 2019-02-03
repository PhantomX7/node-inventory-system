"use strict";
const { Role } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});

    */
    const roles = await Role.findAll();
    if (!roles) {
      queryInterface.bulkInsert(
        "Roles",
        [
          {
            name: "admin",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "guest",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      );
    }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
