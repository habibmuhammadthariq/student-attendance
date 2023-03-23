'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Transaction), {as: 'Transactions' }
      // this.hasMany(models.Transaction), {as: 'transaction', foreignKey: 'studentId' }
    }
  }
  
  Student.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    class: DataTypes.STRING,
    gender: DataTypes.ENUM('Laki Laki', 'Perempuan'),
    birthDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Student',
    paranoid: true,
  });

  Student.getBasicAttribute = () => ['uuid', 'name', 'class', 'gender', 'birthDate']

  return Student;
};