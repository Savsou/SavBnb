'use strict';

const { Image } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Image.bulkCreate([
      {
        imageableId: 1,
        imageableType: 'Spot',
        url: 'https://www.themillsbuilding.com/userfiles/cms/building/images/1/building.jpg',
        preview: true,
      },
      {
        imageableId: 1,
        imageableType: 'Spot',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjTxmOjhiweMJQ4muDyyn-CLhk1Ec_HMIBvQ&usqp=CAU',
        preview: false,
      },
      {
        imageableId: 2,
        imageableType: 'Spot',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Dubai_Marina_Skyline.jpg/1200px-Dubai_Marina_Skyline.jpg',
        preview: false,
      },
      {
        imageableId: 3,
        imageableType: 'Spot',
        url: 'https://images.adsttc.com/media/images/5da1/c12e/3312/fd49/8d00/01f1/newsletter/210.jpg?1570881829',
        preview: true,
      },
      {
        imageableId: 1,
        imageableType: 'Review',
        url: 'https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960',
      },
      {
        imageableId: 2,
        imageableType: 'Review',
        url: 'https://www.kbb.com/wp-content/uploads/2022/08/2022-mercedes-amg-eqs-front-left-3qtr.jpg?w=918',
      },
      {
        imageableId: 3,
        imageableType: 'Review',
        url: 'https://cdn.motor1.com/images/mgl/MkO9NN/s1/future-supercars.webp',
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Images';
    return queryInterface.bulkDelete(options, null, {});
  }
};
