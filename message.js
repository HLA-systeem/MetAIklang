const DISCORD = require('discord.js');
const PREFIX = require('./botSettings.json').prefix;
const FS = require('fs');

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
        let words = message.content.split(/[\s.,?!]/);
        let cmd = BOT.commands.get(words[0].slice(PREFIX.length));
        let args = words.slice(1);
        
        if(message.author.bot){
            return;
        }

        if(message.channel.type == "dm"){
            message.channel.send('Why? Like, why would you DM a bot?');
        }

        if(message.content == 'doremy'){ //for testing 
            message.channel.send('I WILL BREAK YOUR LEGS');
        }

        if(cmd){
            console.log(cmd.run);
            cmd.run(BOT,message,args);
        }

        for(i in words){
            let word = words[i];
            if (word == "metaklang" || word == "Metaklang" || word == "meta" || word == "meta" || word == "Meta" || word == "Mark" || word == "@Metaklang"){
                message.channel.send('no u');
            }
        }
    });
}