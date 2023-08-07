import { Client, GatewayIntentBits } from 'discord.js';

import Command from './constants/command.constant.js';
import { showInfo } from './services/info.service.js';
import { addItem, logItem, removeItem, showItemList, useItem } from './services/supply.service.js';

const PREFIX = '$';
const SPLITTER = ' ';

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
client.on("ready", () =>{
    console.log("The AI schedule tracker bot is online"); //message when bot is online
});

client.on('messageCreate', async (message) => {
    try {
        if (!message.author.bot && message.content.startsWith(PREFIX)) {
            const params = message.content.split(SPLITTER);
            const command = params.shift().split(PREFIX)[1];
    
            switch (command) {
                case Command.INFO: {
                    const sentMessage = showInfo();
                    message.channel.send({ embeds: [sentMessage] });
                    break;
                }
                case Command.SHOW2: 
                case Command.SHOW: {
                    const sentMessage = await showItemList(message.channelId);
                    message.channel.send(sentMessage);
                    break;
                }
                case Command.ADD2: 
                case Command.ADD: {
                    const sentMessage = await addItem(params, message.channelId, message.author);
                    message.channel.send(sentMessage);
                    break;
                }
                case Command.USE2: 
                case Command.USE: {
                    const sentMessage = await useItem(params, message.channelId, message.author);
                    message.channel.send(sentMessage);
                    break;
                }
                case Command.REMOVE2: 
                case Command.REMOVE: {
                    const sentMessage = await removeItem(params, message.channelId);
                    message.channel.send(sentMessage);
                    break;
                }
                case Command.LOG: {
                    const sentMessage = await logItem(params, message.channelId);
                    message.channel.send(sentMessage);
                    break;
                }
                
                default: message.channel.send('Command is not available. Type `$info` for more.');
            }
        }
    } catch (error) {
        console.log(error)
        message.channel.send(`Error happen - ${error.message}`);
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);