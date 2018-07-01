module.exports.rememberImage = (message, image) => {
    let server = message.guild;
    let channels = server.channels;
    let logChannel = channels.find("name","metaiklangs_memories");
    if(logChannel){
        logChannel.send(image);
    }
}