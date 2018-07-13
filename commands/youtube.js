const YOUTUBE = require('simple-youtube-api');
const YTKEY = require('../settings/botSettings.json').ytKey;

module.exports.run = async (bot,message,args) => {
    if(args == ""){
        message.channel.send("https://www.youtube.com/channel/UCDilKlYQ9PLJmF-9pr6HsZQ");
    }

    if(args == "newest"){

     
    }

    if(args == "inactivity"){
        message.channel.send("https://www.youtube.com/channel/UCDilKlYQ9PLJmF-9pr6HsZQ");
    }
}

module.exports.info = {
    name: "Youtube"
}