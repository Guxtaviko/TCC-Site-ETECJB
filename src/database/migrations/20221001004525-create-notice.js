'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('News', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      notice_title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      notice_subtitle: {
        allowNull: false,
        type: Sequelize.STRING
      },
      notice_body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      notice_img: {
        allowNull: false,
        type: Sequelize.STRING
      },
      notice_categoryId: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Categories', 
          key: 'id',
          as: 'notice_categoryId'
        }
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
    await queryInterface.dropTable('Notices');
  }
};