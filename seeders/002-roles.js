'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        name: 'administrator',
        label: 'Administrateur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'photographer',
        label: 'Photographe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'redactor',
        label: 'Rédacteur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'professor',
        label: 'Professeur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'musician',
        label: 'Musicien',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'chief',
        label: 'Chef',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'archivist',
        label: 'Archiviste',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'committee',
        label: 'Commission',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
