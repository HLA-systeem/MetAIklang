const DISCORD = require('discord.js');

module.exports.rememberImage = async (message, image) => {
    let server = message.guild;
    let channels = server.channels;
    
    let logChannel = channels.find("name","metaiklangs_memories");


    if(logChannel){
        return await logChannel.send({files:[image]});
    }
}