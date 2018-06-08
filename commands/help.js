const DISCORD = require('discord.js');
const PREFIX = require('../botSettings.json').prefix;

module.exports.run = async (bot,message,args) => {
    let helpMessage = new DISCORD.RichEmbed()
        .setTitle("Metaiklang Commands")
        .setDescription("Help commands will go here I guess")
        .setColor("#E6E6FA")
        .setThumbnail("https://cdn.discordapp.com/attachments/427943195184201749/450279289137397760/stupidklang.png")
        .addField(PREFIX + "Help", "Yeah, you know what this does.");

        message.channel.send(helpMessage);
}

module.exports.info = {
    name: "Help"
}