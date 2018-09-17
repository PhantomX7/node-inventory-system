"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image_url: {
        type: Sequelize.STRING
      },
      customer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_capital: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      total_sell_price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      payment_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Invoices");
  }
};
