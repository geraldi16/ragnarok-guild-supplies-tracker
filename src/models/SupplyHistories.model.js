import { DataTypes } from 'sequelize';
import { sequelize } from '../database.cjs';

export default sequelize.define('supply_histories', {
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
    }
}, {
    timestamps: true,
})