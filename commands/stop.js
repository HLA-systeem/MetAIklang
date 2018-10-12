
module.exports.run = async (bot,message,args) => {
    let vc = message.member.voiceChannel;
    
    if(bot.guilds.get(message.guild.id).voiceConnection == null){
        message.channel.send("But...I'm not in the Voice Channel..")
    }

    else if(vc == null){
        message.channel.send("You must be in a Voice Channel for this to work.")
    }

    else{
        vc.leave();
    }
}

module.exports.info = {
    name: "Stop"
}