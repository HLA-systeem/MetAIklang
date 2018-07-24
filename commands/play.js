const YTKEY = require('../settings/botSettings.json').ytKey;
const YTDL = require('ytdl-core');
const YTID = require('get-youtube-id');
const YTINFO = require('youtube-info');
const REQ = require('request');

var queque = [];
var playing = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq =  0;
var skippers = [];

module.exports.run = async (bot,message,args) => {
    id = args[0];

    if(queque.length > 0 || playing){
        add_to_queue(id, message);
        YTINFO(id, function(err, videoInfo) {
            if (err) throw new Error(err);
            message.reply(" added to queue: **" + videoInfo.title + "**");
            guilds[message.guild.id].queueNames.push(videoInfo.title);
        });
    }
    else{

    }
}

module.exports.info = {
    name: "Play"
}

function isYT(link){
    return link.toLowerCase().indexOf("youtube.com") > 1;
}

function search(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + YTKEY, (error, response, body) => {
        var json = JSON.parse(body);
        if (!json.items[0]){
            callback("3_-a9nVZYjk");
        }
        else {
            callback(json.items[0].id.videoId); //grabs first item
        }
    });
}

function addQueue(id, message) {
    if (isYT(id)) {
        queue.push(YTID(id));
    } else {
        queue.push(id);
    }
}