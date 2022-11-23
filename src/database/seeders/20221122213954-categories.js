'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      category_name: 'Avisos',
      category_desc: 'Avisos pertinentes aos alunos e seus responsáveis',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      category_name: 'Celebrações',
      category_desc: 'Datas comemorativas do Liceu',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      category_name: 'Vestibulinho',
      category_desc: 'Informações e guias importantes sobre o Vestibulinho',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
