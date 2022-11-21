'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Testimonials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      testimonial_author: {
        type: Sequelize.STRING
      },
      testimonial_role: {
        type: Sequelize.STRING
      },
      testimonial_img: {
        type: Sequelize.STRING
      },
      testimonial_year: {
        type: Sequelize.INTEGER(4)
      },
      testimonial_body: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Testimonials');
  }
};