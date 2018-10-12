const DISCORD = require('discord.js');
const SETTINGS = require('./settings/botSettings.json');
const PREFIX = require('./settings/botSettings.json').prefix;
const FS = require('fs');
const VISION = require('./vision');

module.exports.onMessage = (BOT) => {
    FS.readdir('./commands/', (err,files) => {
        if(err){
            console.log(err);
        }
        else{
            let fileName = files.filter(file => file.split(".").pop() == "js")
            fileName.forEach( (file, i) => {
                commandModule = require('./commands/' + file);
                BOT.commands.set(commandModule.info.name,commandModule);
            });
        }
    });

    BOT.on('message', (message) => {
        if (!message.guild) return;

        let words = message.content.split(/[\s.,?!]/);
        let cmd = BOT.commands.get(words[0].slice(PREFIX.length));
        let args = message.content.split(/[\s]/).slice(1);
        let ats = message.attachments.array();
        
        if(message.author.bot){
            return;
        }

        if(message.channel.type == "dm"){
            message.channel.send('Why? Like, why would you DM a bot?');
        }

        if(!SETTINGS.mute){
            if(message.content == 'doremy'){
                message.channel.send('I WILL BREAK YOUR LEGS'); //for testing
            }
        }

        if(cmd){
            if(!SETTINGS.mute || cmd.info.name == "Mute"){
                cmd.run(BOT,message,args);
            }
        }
        

        if(ats.length != 0){ //make sure to handle bulk upploads in the future
            if(ats[0] != null){
                VISION.look(message,ats[0].url);
            }
        }
    });
}