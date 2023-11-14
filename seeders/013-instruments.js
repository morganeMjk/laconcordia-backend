'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('instruments', [
      {
        id: 1,
        name: 'flute',
        label: 'Flûte',
        statusId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'clarinette',
        label: 'Clarinette',
        statusId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'saxophone',
        label: 'Saxophone',
        statusId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 4,
        name: 'trompette',
        label: 'Trompette',
        statusId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 5,
        name: 'corsHarmonie',
        label: 'Cors',
        statusId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 6,
        name: 'basse',
        label: 'Basse / Baryton',
        statusId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 7,
        name: 'trombone',
        label: 'Trombone',
        statusId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 8,
        name: 'percussions',
        label: 'Percussions',
        statusId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 9,
        name: 'clairon',
        label: 'Clairon',
        statusId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 10,
        name: 'trompetteCavalerie',
        label: 'Trompette de cavalerie',
        statusId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },           
      {
        id: 11,
        name: 'tambours',
        label: 'Tambours',
        statusId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 12,
        name: 'claironBasse',
        label: 'Clairon basse',
        statusId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        name: 'trompetteBasse',
        label: 'Trompette basse',
        statusId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 14,
        name: 'corsClique',
        label: 'Clairon basse',
        statusId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        name: 'grosseCaisse',
        label: 'Grosse caisse',
        statusId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        name: 'cymbale',
        label: 'Cymbale',
        statusId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('instruments', null, {});
  }
};
