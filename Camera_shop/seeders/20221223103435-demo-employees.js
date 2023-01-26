'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Employees',
      [
        {
          id: 1,
          name: "Mihajlo",
          surname: "Madzarevic",
          email: "mixa@gmail.com",
          phoneNum: "069456264",
          cameraShopId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "Zika",
          surname: "Pericic",
          email: "zika@gmail.com",
          phoneNum: "063564241",
          cameraShopId: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: "Dusan",
          surname: "Tanasic",
          email: "dusan@gmail.com",
          phoneNum: "0664436276",
          cameraShopId: "3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: "Petar",
          surname: "Glumic",
          email: "peter@gmail.com",
          phoneNum: "0658363738",
          cameraShopId: "4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: "Uros",
          surname: "Gojak",
          email: "uros@gmail.com",
          phoneNum: "067447384",
          cameraShopId: "5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
