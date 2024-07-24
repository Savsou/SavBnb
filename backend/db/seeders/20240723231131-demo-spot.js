'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: "456 Maple Street",
      city: "New York",
      state: "New York",
      country: "United States of America",
      lat: 40.712776,
      lng: -74.005974,
      name: "Tech Hub",
      description: "Innovative tech community",
      price: 150
    },
    {
      ownerId: 2,
      address: "789 Elm Street",
      city: "Austin",
      state: "Texas",
      country: "United States of America",
      lat: 30.267153,
      lng: -97.743057,
      name: "Code Space",
      description: "Collaborative coding space",
      price: 110
    },
    {
      ownerId: 3,
      address: "321 Oak Avenue",
      city: "Seattle",
      state: "Washington",
      country: "United States of America",
      lat: 47.606209,
      lng: -122.332071,
      name: "Dev Corner",
      description: "Gathering spot for developers",
      price: 130
    }
   ], options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Tech Hub", "Code Space", "Dev Corner"] }
    })
  }
};
