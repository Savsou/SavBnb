'use strict';

const { Booking } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: "2021-11-19",
        endDate: "2021-11-20",
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2022-12-19",
        endDate: "2022-12-25",
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2021-12-19",
        endDate: "2021-12-20",
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, null, {});
  }
};
