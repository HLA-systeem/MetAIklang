const FS = require('fs');
const SETTINGS = require('../settings/botSettings.json');

module.exports.run = async (bot,message,args) => {
    SETTINGS.mute = !SETTINGS.mute;

    if(message.member.hasPermission("MANAGE_MESSAGES") || message.member.roles.find("name","Metaklangs Front Office") || message.member.roles.find("name", "testing room pass") || SETTINGS.mute == false){
        FS.writeFile('../settings/botSettings.json', JSON.stringify(SETTINGS , null, 2), () =>{
            if(SETTINGS.mute){
                message.channel.send("..ok");
            }
            else{
                message.channel.send("Sup, bitches! It's your Bot Metaiklang!");
            }
        });
    }
    else{
        message.channel.send("Everyone can mute, but only admins can umute.");
    }
}

module.exports.info = {
    name: "Mute"
}

