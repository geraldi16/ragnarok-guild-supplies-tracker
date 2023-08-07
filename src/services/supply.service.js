import moment from 'moment/moment.js';

import Supply from '../models/Supplies.model.js';
import SupplyHistory from '../models/SupplyHistories.model.js';
import { generateTable, dataIntoArray } from './utility.service.js';
import { sequelize } from '../database.cjs';

export async function addItem(params, channelId, author) {
    // check item
    const [itemName, amount, ...notes] = params;

    const existingItem = await Supply.findOne({ where: { itemName: itemName.toLowerCase(), channelId } });

    // if exists, add amount
    let itemId;
    if (existingItem) {
        existingItem.amount += parseInt(amount, 10);
        await existingItem.save();
        itemId = existingItem.id;
    } else {
        // else register new entry
        const item = await Supply.create({
            itemName: itemName.toLowerCase(),
            amount,
            channelId,
        });
        itemId = item.id;
    }

    // create history data here
    // const playerName = player ?? author.username;
    try {
        await SupplyHistory.create({
            channelId,
            itemId,
            playerName: author.username,
            deposit: amount,
            withdraw: 0,
            notes: notes?.join(' ') || null,
        });
    } catch (error) {
        console.log('Error while create supply history data', error.message)
    }
    

    return `Successfully add item ${itemName} to the guild storage!`;
}

export async function removeItem(params, channelId) {
    // check item
    const [itemName] = params;

    const existingItem = await Supply.findOne({ where: { itemName: itemName.toLowerCase(), channelId } });

    if (!existingItem) {
        return `Item ${itemName} is not found`;
    }

    await Supply.destroy({ where: { itemName: itemName.toLowerCase(), channelId } });

    return `Successfully remove item ${itemName} to the guild storage!`;
}

export async function useItem(params, channelId, author) {
    // check item
    const [itemName, amount, ...notes] = params;
    console.log(notes)
    const existingItem = await Supply.findOne({ where: { itemName: itemName.toLowerCase(), channelId } });

    if (!existingItem) {
        return `Item ${itemName} is not found`;
    }

    // if exists, substract amount
    let withdraw = amount;
    if (existingItem.amount - parseInt(amount, 10) < 0) {
        withdraw = existingItem.amount;
        existingItem.amount = 0;
    } else {
        existingItem.amount -= parseInt(amount, 10);
    }
    await existingItem.save();

    // create history data here
    // const playerName = player ?? author.username;
    try {
        await SupplyHistory.create({
            channelId,
            itemId: existingItem.id,
            playerName: author.username,
            deposit: 0,
            withdraw,
            notes: notes?.join(' ') || null,
        });
    } catch (error) {
        console.log('Error while withdraw supply history data', error.message)
    }
    

    return `Successfully withdraw item ${itemName} to the guild storage!`;
}

export async function showItemList(channelId) {
    const list = await Supply.findAll({ where: { channelId } });

    return generateTable(dataIntoArray(list, ['itemName', 'amount']), ['Item Name', 'Amount']);
}

export async function logItem(params, channelId) {
    // check item
    const [itemName] = params;
    const existingItem = await Supply.findOne({ where: { itemName: itemName.toLowerCase(), channelId } });

    if (!existingItem) {
        return `Item ${itemName} is not found`;
    }

    const history = await SupplyHistory.findAll({
        where: { itemId: existingItem.id },
        limit: 20,
        order: [['createdAt', 'DESC']],
        attributes: {
            include: [
                [sequelize.fn('strftime', '%Y-%m-%d %H:%M:%S', sequelize.col('createdAt')), 'formattedCreatedAt'],
                [sequelize.literal('CASE WHEN `deposit` = 0 THEN (`withdraw` * -1) ELSE `deposit` END'), 'amount']
            ],
        }
    });

    return generateTable(
        dataIntoArray(JSON.parse(JSON.stringify(history)), ['playerName', 'amount', 'formattedCreatedAt', 'notes']),
        ['Player Name', 'Amount', 'Date', 'Notes'],
        `Item Name: ${itemName}`,
    );
}

