const YTKEY = require('../settings/botSettings.json').ytKey;
const YTDL = require('ytdl-core');
const YTID = require('get-youtube-id');
const YTINFO = require('youtube-info');
const REQ = require('request');

module.exports.run = async (bot,message,args) => {
    if(args == ""){
        message.channel.send("https://www.youtube.com/channel/UCDilKlYQ9PLJmF-9pr6HsZQ");
    }

    if(args == "newest"){

     
    }

    if(args == "waiting"){
        
    }
}

module.exports.info = {
    name: "Youtube"
}