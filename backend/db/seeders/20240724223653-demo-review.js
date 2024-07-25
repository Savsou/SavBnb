'use strict';

const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 1,
        spotId: 1,
        review: 'Great place, very clean and well maintained!',
        stars: 5,
      },
      {
        userId: 1,
        spotId: 2,
        review: 'Nice location but a bit noisy.',
        stars: 4,
      },
      {
        userId: 1,
        spotId: 3,
        review: 'Perfect for a weekend getaway.',
        stars: 5,
      },
      {
        userId: 2,
        spotId: 1,
        review: 'Good value for money.',
        stars: 4,
      },
      {
        userId: 2,
        spotId: 2,
        review: 'Had a wonderful stay, highly recommend.',
        stars: 5,
      },
      {
        userId: 2,
        spotId: 3,
        review: 'Comfortable and cozy place.',
        stars: 4,
      },
      {
        userId: 3,
        spotId: 1,
        review: 'Amazing experience, would love to come back.',
        stars: 5,
      },
      {
        userId: 3,
        spotId: 2,
        review: 'Decent place but needs some improvements.',
        stars: 3,
      },
      {
        userId: 3,
        spotId: 3,
        review: 'Great amenities and friendly staff.',
        stars: 4,
      }
    ], options);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, null, {});
  }
};
