'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('medias', [
      {
        id: 1,
        file: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png',
        albumId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        file: 'https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg',
        albumId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('medias', null, {});
  }
};
