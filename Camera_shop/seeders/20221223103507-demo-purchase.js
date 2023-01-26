'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Purchases',
      [
        {
          id: 1,
          price: "450",
          date: "2022-12-12",
          cameraShopId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          price: "200",
          date: "2021-4-28",
          cameraShopId: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          price: "50",
          date: "2022-11-20",
          cameraShopId: "3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          price: "875",
          date: "2020-08-04",
          cameraShopId: "4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          price: "700",
          date: "2022-12-23",
          cameraShopId: "5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Purchases', null, {});
  }
};
