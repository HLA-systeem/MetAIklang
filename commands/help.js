const DISCORD = require('discord.js');
const PREFIX = require('../settings/botSettings.json').prefix;

module.exports.run = async (bot,message,args) => {
    let helpMessage = new DISCORD.RichEmbed()
        .setTitle("Metaiklang Commands")
        .setDescription("Help commands will go here I guess")
        .setColor("#E6E6FA")
        .setThumbnail("https://cdn.discordapp.com/attachments/427943195184201749/450279289137397760/stupidklang.png")
        .addField(PREFIX + "Help", "Yeah, you know what this does.")
        .addField(PREFIX + "Purify <amount>", " Deletes images. If no number is given, it will purify everything in the channel. Otherwise it will grab that amount of the last messages")
        .addField("Suggestions and Feedback?", "Send an electronic mail to metadevteam@outlook.com, or a tweet to https://twitter.com/MetaklangT?lang=en");
        message.channel.send(helpMessage);
}

module.exports.info = {
    name: "Help"
}