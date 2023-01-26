'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cameras', {
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
      model: {
        type: Sequelize.STRING
      },
      sensor: {
        type: Sequelize.STRING
      },
      megapixels: {
        type: Sequelize.INTEGER
      },
      video_size: {
        type: Sequelize.STRING
      },
      video_fps: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Cameras');
  }
};