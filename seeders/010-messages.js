'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages', [
      {
        lastname: 'Doe',
        firstname: 'John',
        mail: 'flanquart.bastien@gmail.com',
        phone: '+33611730551',
        subject: 'Test',
        content: 'Bonjour, j\'aurais besoin d\'une information',
        isRead: false,
        deletionDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lastname: 'Doe',
        firstname: 'John',
        mail: 'flanquart.bastien@gmail.com',
        phone: '+33611730551',
        subject: 'Test',
        content: 'Bonjour, j\'aurais besoin d\'une information',
        isRead: false,
        deletionDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        lastname: 'Doe',
        firstname: 'John',
        mail: 'flanquart.bastien@gmail.com',
        phone: '+33611730551',
        subject: 'Test',
        content: 'Bonjour, j\'aurais besoin d\'une information',
        isRead: false,
        deletionDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
