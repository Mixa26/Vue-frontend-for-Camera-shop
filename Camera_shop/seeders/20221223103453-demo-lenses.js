'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        'Lenses',
        [
          {
            id: 1,
            company: "Canon",
            zoom: "18-55mm",
            focal_length: "F4.5-5.6",
            mount: "Canon EF-S",
            price: "150",
            cameraShopId: "1",           
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 2,
            company: "Sigma",
            zoom: "70-200mm",
            focal_length: "F2.7",
            mount: "Canon EF",
            price: "500",
            cameraShopId: "2",           
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 3,
            company: "Sony",
            zoom: "24-70mm",
            focal_length: "F2.8",
            mount: "Sony E",
            price: "2300",
            cameraShopId: "3",           
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 4,
            company: "Sony",
            zoom: "70-200mm",
            focal_length: "F2.8",
            mount: "Sony E",
            price: "2800",
            cameraShopId: "4",          
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 5,
            company: "Insta360",
            zoom: "16mm",
            focal_length: "F2.8",
            mount: "Insta360 OneR & OneRS",
            price: "200",
            cameraShopId: "5",          
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ],
        {}
      );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Lenses', null, {});
  }
};
