'use strict';

const crypto = require('crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('transactions', [{
      uuid: crypto.randomUUID(),
      studentId: 1,
      type: 'PRESENT',
      createdAt: new Date("2023-03-20"),
      updatedAt: new Date("2023-03-20")
    },{
      uuid: crypto.randomUUID(),
      studentId: 1,
      type: 'PRESENT',
      createdAt: new Date("2023-03-21"),
      updatedAt: new Date("2023-03-21")
    },{
      uuid: crypto.randomUUID(),
      studentId: 1,
      type: 'ABSENT',
      createdAt: new Date("2023-03-22"),
      updatedAt: new Date("2023-03-22")
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('transactions', null, {})
  }
};
