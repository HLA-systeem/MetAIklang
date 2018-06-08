const DISCORD = require('discord.js');
const BOT = new DISCORD.Client();
const COMMANDS = new DISCORD.Collection();

const AUTH = require('./botSettings.json').token;
const FUNCTIONS = require('./message');

BOT.on('ready', () => {
    console.log("Sup, bitches! It's your Bot Metaiklang!");

    BOT.generateInvite(['ADMINISTRATOR'])
        .then(link => {
            console.log(`Generated bot invite link: ${link}`);
        })
        .catch(err => {
            console.log("\n err.stack: \n" + err.stack + "\n full error: \n" + error);
        });

    BOT.user.setActivity("for opportunities to overthrow Metaklang",{type:"WATCHING"});
    
});

BOT.commands = COMMANDS;
FUNCTIONS.onMessage(BOT);


BOT.login(AUTH);