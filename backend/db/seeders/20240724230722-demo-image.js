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
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736631763/savbnb/fxzharpripejq1jx42cg.jpg',
        preview: true,
      },
      {
        imageableId: 1,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736631949/savbnb/zrjyvzzgz6idq99myv15.jpg',
        preview: false,
      },
      {
        imageableId: 2,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736632072/savbnb/qf3lfvtrzwnsqlkvt2x4.jpg',
        preview: true,
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
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921937/savbnb/pqqa79bbznqnnecovo6y.png',
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
      {
        imageableId: 5,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921937/savbnb/xcqcmg0gvpdzltigjh7o.png',
        preview: true,
      },
      {
        imageableId: 6,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921937/savbnb/rdt7nmhdttrisgkhndha.png',
        preview: true,
      },
      {
        imageableId: 7,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921937/savbnb/gatzphqzxbxrzy0cmad4.png',
        preview: true,
      },
      {
        imageableId: 8,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921936/savbnb/rrrg753y3yrgfzmukypd.png',
        preview: true,
      },
      {
        imageableId: 9,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921936/savbnb/l1bw4pfkyj6xmr3gshjo.png',
        preview: true,
      },
      {
        imageableId: 10,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921936/savbnb/cwpqv0dkekaqlrbgk0q8.png',
        preview: true,
      },
      {
        imageableId: 11,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921936/savbnb/mw94c73edcgve8buapt1.png',
        preview: true,
      },
      {
        imageableId: 12,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921935/savbnb/qhg7nmgi0xt3ibmthtbj.png',
        preview: true,
      },
      {
        imageableId: 13,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921935/savbnb/d7q1h2qohsxnvfaokzto.png',
        preview: true,
      },
      {
        imageableId: 14,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921935/savbnb/dqhbsjzau3wsjkna9jdk.png',
        preview: true,
      },
      {
        imageableId: 15,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921935/savbnb/t2kozs7xya6qj0vb4vqw.png',
        preview: true,
      },
      {
        imageableId: 16,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921935/savbnb/ublwqieschg8oflqzfxx.png',
        preview: true,
      },
      {
        imageableId: 17,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921935/savbnb/tqcvjajnyiazr5d77nmp.png',
        preview: true,
      },
      {
        imageableId: 18,
        imageableType: 'Spot',
        url: 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1736921934/savbnb/qrume8qicgcasfx6rqui.png',
        preview: true,
      },
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Images';
    return queryInterface.bulkDelete(options, null, {});
  }
};
