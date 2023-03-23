'use strict';

const crypto = require('crypto')

require('dotenv').config()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('students', [{
      uuid: crypto.randomUUID(),
      name: 'ahmad alfaruq',
      class: '1 A',
      gender: 'Laki Laki',
      birthDate: new Date("2000-03-25"),
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('students', null, {})
  }
};
