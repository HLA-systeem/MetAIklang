const DISCORD = require('discord.js');

module.exports.run = async (bot,message,args) => {
    message.channel.send("HandlerTest OK");
}

module.exports.info = {
    name: "Youtube"
}