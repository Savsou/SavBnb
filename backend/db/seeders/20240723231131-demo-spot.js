'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      // User 1 Spots
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
        ownerId: 1,
        address: "100 Main Street",
        city: "Boston",
        state: "Massachusetts",
        country: "United States of America",
        lat: 42.360081,
        lng: -71.058884,
        name: "Innovation Alley",
        description: "Inspiring creative ideas",
        price: 180
      },
      {
        ownerId: 1,
        address: "88 Broadway",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.774929,
        lng: -122.419418,
        name: "Bay Area Base",
        description: "Great views, better ideas",
        price: 200
      },
      {
        ownerId: 1,
        address: "10 Wall Street",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.707492,
        lng: -74.011276,
        name: "Finance Focus",
        description: "High-energy workspace",
        price: 170
      },
      {
        ownerId: 1,
        address: "50 Grove Street",
        city: "Miami",
        state: "Florida",
        country: "United States of America",
        lat: 25.761681,
        lng: -80.191788,
        name: "Tropical Tech",
        description: "Collaborate by the beach",
        price: 140
      },
      {
        ownerId: 1,
        address: "77 Pine Street",
        city: "Chicago",
        state: "Illinois",
        country: "United States of America",
        lat: 41.878113,
        lng: -87.629799,
        name: "Midwest Minds",
        description: "Heart of the Windy City",
        price: 160
      },

      // User 2 Spots
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
        ownerId: 2,
        address: "123 Pearl Street",
        city: "Denver",
        state: "Colorado",
        country: "United States of America",
        lat: 39.739236,
        lng: -104.990251,
        name: "Rocky Workspace",
        description: "Views of the Rockies",
        price: 130
      },
      {
        ownerId: 2,
        address: "65 Cedar Street",
        city: "Phoenix",
        state: "Arizona",
        country: "United States of America",
        lat: 33.448376,
        lng: -112.074036,
        name: "Desert Innovators",
        description: "Work in the sun",
        price: 120
      },
      {
        ownerId: 2,
        address: "89 Spruce Avenue",
        city: "Portland",
        state: "Oregon",
        country: "United States of America",
        lat: 45.505106,
        lng: -122.675026,
        name: "Rainy Retreat",
        description: "Cozy and creative",
        price: 115
      },
      {
        ownerId: 2,
        address: "12 Vine Street",
        city: "Nashville",
        state: "Tennessee",
        country: "United States of America",
        lat: 36.162663,
        lng: -86.781601,
        name: "Music Makers",
        description: "Where creativity thrives",
        price: 125
      },
      {
        ownerId: 2,
        address: "90 Willow Lane",
        city: "Salt Lake City",
        state: "Utah",
        country: "United States of America",
        lat: 40.760779,
        lng: -111.891047,
        name: "Mountain Workspace",
        description: "Inspiration in the mountains",
        price: 140
      },

      // User 3 Spots
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
      },
      {
        ownerId: 3,
        address: "22 Birch Road",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 34.052235,
        lng: -118.243683,
        name: "Hollywood Workspace",
        description: "Creative vibes near Hollywood",
        price: 200
      },
      {
        ownerId: 3,
        address: "33 Aspen Way",
        city: "San Diego",
        state: "California",
        country: "United States of America",
        lat: 32.715736,
        lng: -117.161087,
        name: "Pacific Work Oasis",
        description: "Ocean views and focus",
        price: 180
      },
      {
        ownerId: 3,
        address: "444 Redwood Drive",
        city: "Sacramento",
        state: "California",
        country: "United States of America",
        lat: 38.581573,
        lng: -121.4944,
        name: "Capital Creators",
        description: "Work hard in the capital",
        price: 140
      },
      {
        ownerId: 3,
        address: "55 Elm Boulevard",
        city: "Las Vegas",
        state: "Nevada",
        country: "United States of America",
        lat: 36.169941,
        lng: -115.139832,
        name: "Vegas Visionaries",
        description: "Inspiration under the lights",
        price: 160
      },
      {
        ownerId: 3,
        address: "66 Fir Lane",
        city: "Orlando",
        state: "Florida",
        country: "United States of America",
        lat: 28.538336,
        lng: -81.379234,
        name: "Theme Park Workspace",
        description: "Focus near the fun",
        price: 150
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: [
          "Tech Hub", "Innovation Alley", "Bay Area Base", "Finance Focus", "Tropical Tech", "Midwest Minds",
          "Code Space", "Rocky Workspace", "Desert Innovators", "Rainy Retreat", "Music Makers", "Mountain Workspace",
          "Dev Corner", "Hollywood Workspace", "Pacific Work Oasis", "Capital Creators", "Vegas Visionaries", "Theme Park Workspace"
        ]
      }
    });
  }
};
