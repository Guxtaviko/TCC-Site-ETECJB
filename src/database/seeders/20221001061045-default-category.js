'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      category_name: 'Indefinida',
      category_desc: 'Categoria para publicações sem categoria definida',
      createdAt: new Date(),
      updatedAt: new Date()
    }],)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};