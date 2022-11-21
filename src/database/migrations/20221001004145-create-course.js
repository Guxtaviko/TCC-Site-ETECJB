'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      course_desc: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      course_img: {
        allowNull: false,
        type: Sequelize.STRING
      },
      course_workload: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      course_curriculum: {
        allowNull: false,
        type: Sequelize.STRING
      },
      course_period: {
        allowNull: false,
        type: Sequelize.STRING
      },
      course_vacancies: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      course_coordinator: {
        allowNull: false,
        type: Sequelize.STRING
      },
      course_email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      course_shift: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Courses');
  }
};