'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Tripods',
      [
        {
          id: 1,
          company: "Joby",
          model: "GorillaPod 5K",
          carry_capacity: "5",
          meant_for: "Cameras/Devices",
          price: "150",
          cameraShopId: "1",        
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          company: "Joby",
          model: "GorillaPod 3K",
          carry_capacity: "3",
          meant_for: "Cameras",
          price: "50",
          cameraShopId: "2",        
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          company: "Legged Thing",
          model: "Winston 2.0",
          carry_capacity: "30",
          meant_for: "Cameras/Devices",
          price: "400",
          cameraShopId: "3",         
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          company: "Vanguard",
          model: "Veo 3+",
          carry_capacity: "15",
          meant_for: "Cameras/Devices",
          price: "300",
          cameraShopId: "4",         
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          company: "Gopro",
          model: "Tripod",
          carry_capacity: "2",
          meant_for: "Action Camera",
          price: "30",
          cameraShopId: "5",         
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tripods', null, {});
  }
};
