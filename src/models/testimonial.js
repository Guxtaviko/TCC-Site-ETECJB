'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Testimonial.init({
    testimonial_author: DataTypes.STRING,
    testimonial_role: DataTypes.STRING,
    testimonial_img: DataTypes.STRING,
    testimonial_year: DataTypes.INTEGER,
    testimonial_body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Testimonial',
  });
  return Testimonial;
};