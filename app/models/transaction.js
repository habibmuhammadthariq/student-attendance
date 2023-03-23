'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Student)
    }
  }

  Transaction.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    type: DataTypes.ENUM('PRESENT', 'ABSENT'),
    notes: DataTypes.STRING,
    studentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
    paranoid: true
  });

  Transaction.getBasicAttribute = () => ['uuid', 'type', 'notes', 'createdAt']

  return Transaction;
};