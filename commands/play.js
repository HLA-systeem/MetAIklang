const YTKEY = require('../settings/botSettings.json').ytKey;
const YTDL = require('ytdl-core');
const YTID = require('get-youtube-id');
const YTINFO = require('youtube-info');
const REQ = require('request');

var queque = [];
var queueNames = [];

var playing = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq =  0;
var skippers = [];

var searchSeeds = ["touhou crystallized silver"];

module.exports.run = async (bot,message,args) => {
    id = args[0];

    if(playing){
        if(add_to_queue(id, message)){
            YTINFO(id, function(err, info) {
                if (err) console.log(err);
                message.channel.send("Added"+ info.title + "to queue");
                queueNames.push(info.title);
            });
        }
    }
    else{
        if(isYT(id)){
            playing = true;
            start(id,message);
            YTINFO(id, function(err, info) {
                if (err) console.log(err);
                message.channel.send("Now playing " + info.title + "");
            });
        }
        else{
            message.channel.send("I'm a Youtuber, I only play from Youtbe.");
        }

    }
}

module.exports.info = {
    name: "Play"
}

function isYT(link){
    return link.toLowerCase().indexOf("youtube.com") > 1;
}

function search(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?type=video&q="+ searchSeeds[0] + "+" + encodeURIComponent(query) + "&key=" + YTKEY, (error, response, body) => {
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
        return true;
    } 
    else {
        message.channel.send("I'm a Youtuber, I only play from Youtbe.");
        return false;
    }
}

function start(id, message) {
    guilds[message.guild.id].voiceChannel = message.member.voiceChannel;



    guilds[message.guild.id].voiceChannel.join().then(function(connection) {
        stream = ytdl("https://www.youtube.com/watch?v=" + id, {
            filter: 'audioonly'
        });
        guilds[message.guild.id].skispReq = 0;
        guilds[message.guild.id].skippers = [];

        guilds[message.guild.id].dispatcher = connection.playStream(stream);
        guilds[message.guild.id].dispatcher.on('end', function() {
            guilds[message.guild.id].skipReq = 0;
            guilds[message.guild.id].skippers = [];
            guilds[message.guild.id].queue.shift();
            guilds[message.guild.id].queueNames.shift();
            if (guilds[message.guild.id].queue.length === 0) {
                guilds[message.guild.id].queue = [];
                guilds[message.guild.id].queueNames = [];
                guilds[message.guild.id].isfPlaying = false;
            } else {
                setTimeout(function() {
                    playMusic(guilds[message.guild.id].queue[0], message);
                }, 500);
            }
        });
    });
}