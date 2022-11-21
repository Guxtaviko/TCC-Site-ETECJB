'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const bcrypt = require('bcrypt')
    const salt = await bcrypt.genSalt(12)
    await queryInterface.bulkInsert('Users', [{
      username: 'Admin',
      email: 'Admin@dominio.com',
      password: await bcrypt.hash('1234', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    }],)
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Users', null, {});
  }
};