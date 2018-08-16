const DISCORD = require('discord.js');
const PREFIX = require('../settings/botSettings.json').prefix;

module.exports.run = async (bot,message,args) => {
    let helpMessage = new DISCORD.RichEmbed()
        .setTitle("Metaiklang Commands")
        .setDescription("<> = type queries in here, don't type the <>.\n ? = optional.")
        .setColor("#E6E6FA")
        .setThumbnail("https://cdn.discordapp.com/attachments/427943195184201749/450279289137397760/stupidklang.png")
        .addField(PREFIX + "Help", "Yeah, you know what this does.")
        .addField(PREFIX + "Booru ?nsfw <tag>", "Gives random Danbooru image with that tag, only one tag can be given and if it's nsfw or not")
        .addField(PREFIX + "Purify <amount>", " Deletes images. If no number is given, it will purify all images in the channel until around 50 messages past. Otherwise it will grab that amount of the last messages")
        .addField(PREFIX + "Sample <concept name> <link to image>", "Test samples for visual recogniton, seperate links with spaces to provide multiple at once")
        .addField(PREFIX + "Play <link>", "Play Youtube audio in voice chat with shitty quality.")
        .addField(PREFIX + "Stop", "Leaves the Voice Channel")
        .addField("Suggestions and Feedback?", "Send an electronic mail to metadevteam@outlook.com, or a tweet to https://twitter.com/MetaklangT?lang=en");
        message.channel.send(helpMessage);
}

module.exports.info = {
    name: "Help"
}