'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Microphones',
      [
        {
          id: 1,
          company: "Rode",
          model: "VideMicro",
          type: "Shotgun",
          frequency_range: "100-20000Hz",
          price: "70",
          cameraShopId: "1",         
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          company: "Joby",
          model: "Wavo Pod",
          type: "Studio",
          frequency_range: "20-20000Hz",
          price: "100",
          cameraShopId: "2",          
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          company: "Rode",
          model: "Wireless Go",
          type: "Bug microphone",
          frequency_range: "50-20000Hz",
          price: "270",
          cameraShopId: "3",         
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          company: "DJI",
          model: "Mic",
          type: "Bug microphone",
          frequency_range: "50-20000Hz",
          price: "330",
          cameraShopId: "4",          
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          company: "Rode",
          model: "VideoMic Go",
          type: "Shotgun",
          frequency_range: "100-20000",
          price: "100",
          cameraShopId: "5",         
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Microphones', null, {});
  }
};
