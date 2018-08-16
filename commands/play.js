const YTKEY = require('../settings/botSettings.json').ytKey;
const YTDL = require('ytdl-core');
const YTID = require('get-youtube-id');
const YTINFO = require('youtube-info');
const REQ = require('request');
const STOP = require('./stop');

var queue = [];
var queueNames = [];

var playing = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq =  0;
var skippers = [];

var searchSeeds = ["touhou crystallized silver"];

module.exports.run = async (bot,message,args) => {
    link = args[0];

    if(isYT(link)){
        if(playing){
            let id = YTID(link);
            queue.push(id);
            
            YTINFO(id, (err, info) => {
                if (err) console.log(err);
                message.channel.send("Added "+ info.title + " to queue");
                queueNames.push(info.title);
            });
        }
        else{
            start(YTID(link),message);
        }
    }
    else{
        message.channel.send("I'm a Youtuber, I only play from Youtbe.");
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

function skip(message) {
    dispatcher.end();
}


function start(id, message) {
    let vc = message.member.voiceChannel;
    if(vc == null){
        message.channel.send("You must be in a Voice Channel for this to work.")
    }
    else{
        vc.join()
            .then((connection) => {
                let stream = YTDL("https://www.youtube.com/watch?v=" + id, {
                    filter: 'audioonly'
                });

                playing = true;
                skipReq = 0;
                skippers = [];
                dispatcher = connection.playStream(stream);

                dispatcher.on('end', function() {
                    skipReq = 0;
                    skippers = [];

                    if(queue.length === 0){
                        queue = [];
                        queueNames = [];
                        playing = false;
                        vc.leave();
                    } 
                    else{
                        setTimeout(function() {
                            console.log(queue[0]);
                            start(queue[0], message);
                            queue.shift();
                            queueNames.shift();
                        }, 500);
                    }
                });

                YTINFO(id, (err, info) => {
                    if (err) console.log(err);
                    message.channel.send("Now playing " + info.title + "");
                });
            })
            .catch(err => console.log(err));
    }
}