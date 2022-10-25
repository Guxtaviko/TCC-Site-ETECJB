'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('News', 'notice_author', {
        type: Sequelize.STRING,
        defaultValue: 'Desconhecido',
        allowNull: false
      });
      await queryInterface.addColumn('News', 'notice_date', {
        type: Sequelize.DATEONLY,
        allowNull: false
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('News', 'notice_author');
      await queryInterface.removeColumn('News', 'notice_date');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
