import { EmbedBuilder } from 'discord.js';

export function showInfo() {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Command Lists')
        .setDescription('Usable commands listed below:')
        .addFields(
            {
                name: '\u200B',
                value: '\u200B',
            },
            {
                name: '`$info`',
                value: 'show usable command lists.',
            },
            {
                name: '`$showlist / $sl`',
                value: 'show item lists available in our guild storage.',
            },
            {
                name: '`$add/a <itemname> <amount> {<notes>}`',
                value: 'adding/register item to the supply list',
            },
            {
                name: '`$use/u <itemname> <amount> {<notes>}`',
                value: 'substract item to the supply list',
            },
            {
                name: '`$remove/r <itemname>`',
                value: 'remove item from database.',
            },
            {
                name: '`$log <itemname>`',
                value: 'See Activity of an item.',
            },
        )
}