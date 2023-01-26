'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cameraShopId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      shoppingCartId: {
        type: Sequelize.INTEGER,
      },
      company: {
        type: Sequelize.STRING
      },
      zoom: {
        type: Sequelize.STRING
      },
      focal_length: {
        type: Sequelize.STRING
      },
      mount: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lenses');
  }
};