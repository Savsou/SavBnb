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
    },
    {
      ownerId: 1,
      address: "456 Boom Hauer",
      city: "New Boom",
      state: "Hauer York",
      country: "United States of Hauer",
      lat: 40.712776,
      lng: -74.005974,
      name: "Boomhauer",
      description: "Man, I tell ya what, man, you got this dang ol' thing goin' on, man, and you know, it’s like, you got your friends, they all tell ya one thing, and then you got your dang ol' family, and they got their own ideas, and it’s like, man, you just gotta find that middle ground, you know what I’m sayin'? Dang ol' keep it simple, man, just keep it simple, that’s all I’m sayin’. You know what I’m talkin’ about? Yeah, man, you know, it’s like, you’re workin’ on this dang ol' project, and you got this big ol' plan, and then you hit a snag, you know what I’m sayin’? Dang ol' don’t get all flustered, man, you just gotta take a step back, man, look at it from a different angle, and then, dang ol' get back in there, man. Things’ll work out, man, you just gotta hang in there. Man, I tell ya, you ever had one of them days where it’s just like, everything’s just goin' all sideways, man? Dang ol’ you wake up, and it’s like, you spill your coffee, and then you get stuck in traffic, and then it’s like, dang ol’ work's a mess, man. But you know what? Sometimes you just gotta laugh it off, man, keep your chin up, and just go with the flow, man. Well, you know, man, life’s kinda like, you got your ups and your downs, and you just gotta roll with it, man. Dang ol’ things ain’t always gonna be perfect, you know what I’m sayin'? Sometimes you just gotta take what you get, and make the best out of it, man. Don’t let it get ya down, just keep on truckin’, man. Yeah, man, you got that big ol' thing you're dealin' with, and it’s like, dang ol' one step forward, two steps back, you know? Man, it’s all part of the game, you just gotta stay focused, and keep your head in the game, man. Dang ol' don’t let the little stuff get to ya, man, just keep pushin’ through.",
      price: 120.12
    },
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
