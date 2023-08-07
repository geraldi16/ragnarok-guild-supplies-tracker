'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (migration, DataTypes) {
    await migration.createTable('supplies', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      channelId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      itemName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  },
  async down (migration) {
    await migration.dropTable('supplies');
  }
};