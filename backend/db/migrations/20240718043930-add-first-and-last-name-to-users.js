'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn({ tableName: 'Users', schema: options.schema }, 'firstName', {
      type: Sequelize.STRING(256),
      allowNull: false,
    });

    await queryInterface.addColumn({ tableName: 'Users', schema: options.schema }, 'lastName', {
      type: Sequelize.STRING(256),
      allowNull: false,
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn({ tableName: 'Users', schema: options.schema }, 'firstName');
    await queryInterface.removeColumn({ tableName: 'Users', schema: options.schema }, 'lastName');
  }
};
