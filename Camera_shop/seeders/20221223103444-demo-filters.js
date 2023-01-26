'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Filters',
      [
        {
          id: 1,
          company: "K&F",
          diameter: "58",
          purpose: "Variable ND",
          price: "40",
          cameraShopId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          company: "Hoya",
          diameter: "72",
          purpose: "Variable Polarizer",
          price: "100",
          cameraShopId: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          company: "Lee",
          diameter: "82",
          purpose: "Variable Polarizer",
          price: "45",
          cameraShopId: "3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          company: "Cokin",
          diameter: "77",
          purpose: "UV",
          price: "10",
          cameraShopId: "4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          company: "K&F",
          diameter: "49",
          purpose: "ND",
          price: "40",
          cameraShopId: "5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Filters', null, {});
  }
};
