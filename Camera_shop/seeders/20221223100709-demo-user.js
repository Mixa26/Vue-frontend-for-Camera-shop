'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          username: "mixa",
          admin: true,
          password: bcrypt.hashSync("1234", 10),
          email: "mixa@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          username: "moderator",
          admin: false,
          password: bcrypt.hashSync("1234", 10),
          email: "mod@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          username: "zika",
          admin: false,
          password: bcrypt.hashSync("1234", 10),
          email: "zikaxa@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          username: "dusan",
          admin: false,
          password: bcrypt.hashSync("1234", 10),
          email: "dusan@yahoo.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 5,
          username: "uros",
          admin: false,
          password: bcrypt.hashSync("1234", 10),
          email: "uros@outlook.com",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
