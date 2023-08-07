import { DataTypes } from 'sequelize';
import { sequelize } from '../database.cjs';

export default sequelize.define('supplies', {
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
}, {
    timestamps: true,
  });