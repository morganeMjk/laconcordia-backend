'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('status', [
      {
        id: 1,
        name: 'presidentHonneur',
        label: 'Président d\'honneur',
        type: 'committee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'president',
        label: 'Président',
        type: 'committee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'presidentAdjoint',
        label: 'Président Adjoint',
        type: 'committee',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 4,
        name: 'tresoriere',
        label: 'Trésorier',
        type: 'committee',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 5,
        name: 'tresorierAdjoint',
        label: 'Trésorier Adjoint',
        type: 'committee',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 6,
        name: 'secretaire',
        label: 'Secrétaire',
        type: 'committee',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 7,
        name: 'secretaireAdjoint',
        label: 'Secrétaire Adjoint',
        type: 'committee',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 8,
        name: 'commission',
        label: 'Membre de la Commission',
        type: 'committee',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 9,
        name: 'chefHarmonie',
        label: 'Chef de l\'Harmonie',
        type: 'DirectionHarmonie',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 10,
        name: 'chefClique',
        label: 'Chef de la Clique',
        type: 'DirectionClique',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 11,
        name: 'sousChef',
        label: 'Sous-chef de l\'Harmonie',
        type: 'DirectionHarmonie',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 12,
        name: 'harmonie',
        label: 'Membre de l\'Harmonie',
        type: 'MusicienHarmonie',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        id: 13,
        name: 'clique',
        label: 'Membre de la Clique',
        type: 'MusicienClique',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status', null, {});
  }
};
