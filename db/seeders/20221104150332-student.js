'use strict';

const crypto = require('crypto')

require('dotenv').config()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('students', [{
      uuid: crypto.randomUUID(),
      name: 'Ridho fahrusi',
      class: '1 A',
      gender: 'Laki Laki',
      birthDate: new Date("2000-11-15"),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      uuid: crypto.randomUUID(),
      name: 'Willy setiawan',
      class: '1 A',
      gender: 'Laki Laki',
      birthDate: new Date("2000-03-25"),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      uuid: crypto.randomUUID(),
      name: 'Rindi franco',
      class: '1 A',
      gender: 'Laki Laki',
      birthDate: new Date("2000-01-02"),
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('students', null, {})
  }
};
