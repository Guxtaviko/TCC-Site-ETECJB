'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    course_name: DataTypes.STRING,
    course_desc: DataTypes.TEXT,
    course_img: DataTypes.STRING,
    course_workload: DataTypes.INTEGER,
    course_curriculum: DataTypes.STRING,
    course_period: DataTypes.STRING,
    course_vacancies: DataTypes.INTEGER,
    course_coordinator: DataTypes.STRING,
    course_email: DataTypes.STRING,
    course_shift: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};