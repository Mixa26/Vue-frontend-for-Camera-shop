'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'shopping_carts',
      [
        {
          id: 1,
          price: "450",
          purchaseId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          price: "200",
          purchaseId: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          price: "50",
          purchaseId: "3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          price: "875",
          purchaseId: "4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          price: "700",
          purchaseId: "5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('shopping_carts', null, {});
  }
};
