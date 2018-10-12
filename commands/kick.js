module.exports.run = async (bot,message,args) => {
    if(message.member.hasPermission("MANAGE_MESSAGES") || message.member.roles.find("name","Metaklangs Front Office") || message.member.roles.find("name", "testing room pass")){
        let kickMe = message.guild.members.get(args[0]);
    }

    else{
        message.channel.send("You do not have that permission fam");
    }
}

module.exports.info = {
    name: "Kick"
}