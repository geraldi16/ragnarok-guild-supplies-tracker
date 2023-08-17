'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (migration, DataTypes) {
    await migration.createTable('supply_histories', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      channelId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      itemId: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      playerName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      deposit: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      withdraw: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      amountLeft: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      notes: {
          type: DataTypes.STRING,
          allowNull: true,
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
    await migration.dropTable('supply_histories');
  }
};