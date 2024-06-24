const bcrypt = require('bcrypt');
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      email: 'kel6@gmail.com',
      password: await bcrypt.hash('kel6',10),
      name: 'Kelompok Enam',
      nim: '2211520000',
      role:'mahasiswa',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      email: 'admin@gmail.com',
      password: await bcrypt.hash('admin',10),
      name: 'admin',
      nim: '',
      role:'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
     }
    ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
