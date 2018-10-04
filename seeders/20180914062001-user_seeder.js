"use strict";

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
    // return queryInterface.bulkInsert(
    //   "Users",
    //   [
    //     {
    //       username: "admin",
    //       password: "password",
    //       roleID: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     }
    //   ],
    //   {}
    // );
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
