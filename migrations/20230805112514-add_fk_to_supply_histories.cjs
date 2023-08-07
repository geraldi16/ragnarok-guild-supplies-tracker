'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding the foreign key constraint
    await queryInterface.addConstraint('supply_histories', {
      fields: ['itemId'],
      type: 'foreign key',
      name: 'fk_itemid_supplies_supply_histories',
      references: {
        table: 'supplies',
        field: 'id',
      },
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE', 
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Removing the foreign key constraint
    await queryInterface.removeConstraint('Posts', 'fk_itemid_supplies_supply_histories');
  }
};
