'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Suppliers',
      [
        {
          id: 1,
          name: "Etsy",
          country_origin: "Hungary",
          cameraShopId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "French-Camera",
          country_origin: "France",
          cameraShopId: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: "Gibellini Camera",
          country_origin: "Italy",
          cameraShopId: "3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: "Pinguin photo",
          country_origin: "Russia",
          cameraShopId: "4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: "Kamerastore",
          country_origin: "Germany",
          cameraShopId: "5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Suppliers', null, {});
  }
};
