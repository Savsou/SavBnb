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
      },
      {
        imageableId: 1,
        imageableType: 'Spot',
        url: 'https://www.marthastewart.com/thmb/lxfu2-95SWCS0jwciHs1mkbsGUM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/modern-living-rooms-wb-1-bc45b0dc70e541f0ba40364ae6bd8421.jpg',
        preview: false,
      },
      {
        imageableId: 1,
        imageableType: 'Spot',
        url: 'https://www.feinmann.com/wp-content/uploads/What-is-a-wet-room-bathroom-02.jpg',
        preview: false,
      },
      {
        imageableId: 1,
        imageableType: 'Spot',
        url: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2023/08/Master-bedroom-inspiration-for-a-luxurious-interior-design.jpg',
        preview: false,
      },
      {
        imageableId: 4,
        imageableType: 'Spot',
        url: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/06/king-of-the-hill-boomhauer.jpg',
        preview: true,
      },
      {
        imageableId: 4,
        imageableType: 'Spot',
        url: 'https://mhf-mag.com/wp-content/uploads/2021/06/Okay-Boomhauer-Logo.jpg',
        preview: false,
      },
      {
        imageableId: 4,
        imageableType: 'Spot',
        url: 'https://i.pinimg.com/originals/fb/40/74/fb40740c6f902df9017b5f1fcbc998c6.jpg',
        preview: false,
      },
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Images';
    return queryInterface.bulkDelete(options, null, {});
  }
};
