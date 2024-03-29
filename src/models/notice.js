'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notice.belongsTo(models.Category, {
        foreignKey: 'notice_categoryId',
        defaultValue: 1,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Notice.init({
    notice_title: DataTypes.STRING,
    notice_subtitle: DataTypes.STRING,
    notice_body: DataTypes.TEXT,
    notice_img: DataTypes.STRING,
    notice_categoryId: DataTypes.INTEGER,
    notice_author: DataTypes.STRING,
    notice_date: DataTypes.DATEONLY,
    notice_views: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'news',
    modelName: 'Notice',
  });
  return Notice;
};