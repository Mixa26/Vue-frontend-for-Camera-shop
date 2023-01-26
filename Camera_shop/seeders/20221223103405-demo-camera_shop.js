'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Camera_shops',
      [
        {
          id: 1,
          name: "PC Foto Biz",
          location: "Banovo Brdo",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "Foto Diskont",
          location: "Banovo Brdo",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: "Josipovic doo",
          location: "Novi Beograd",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          name: "BM Focus",
          location: "Banovo Brdo",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          name: "Manhattan",
          location: "Dorcol",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Camera_shops', null, {});
  }
};
