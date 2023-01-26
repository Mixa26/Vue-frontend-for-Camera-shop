'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Cameras',
      [
        {
          id: 1,
          company: "Canon",
          model: "200D",
          sensor: "APS-C",
          megapixels: "24",
          video_size: "1920x1080",
          video_fps: "60",
          price: "500",
          cameraShopId: "1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          company: "Sony",
          model: "A6400",
          sensor: "APS-C",
          megapixels: "24",
          video_size: "3840x2160",
          video_fps: "30",
          price: "900",
          cameraShopId: "2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          company: "Canon",
          model: "R",
          sensor: "FF",
          megapixels: "30",
          video_size: "3840x2160",
          video_fps: "30",
          price: "1350",
          cameraShopId: "3",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          company: "Sony",
          model: "A7IV",
          sensor: "FF",
          megapixels: "33",
          video_size: "3840x2160",
          video_fps: "60",
          price: "2800",
          cameraShopId: "4",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          company: "GoPro",
          model: "Hero 11",
          sensor: "8:7 Sensor",
          megapixels: "27",
          video_size: "5312x2988",
          video_fps: "60",
          price: "700",
          cameraShopId: "5",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cameras', null, {});
  }
};
