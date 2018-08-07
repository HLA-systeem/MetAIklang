module.exports.run = async (bot,message,args) => {
    console.log("test 1");
    if(message.member.hasPermission("MANAGE_MESSAGES") || message.member.roles.find("name","Metaklangs Front Office") || message.member.roles.find("name", "testing room pass")){
        if(args != null){
            console.log("test 2");
            message.channel.fetchMessages({limit: parseInt(args)})
            .then(messages => {
                for(let i=0; i < messages.array().length; i++){
                    console.log(i);
                    let ats = messages.array()[i].attachments.array();
                    if(ats.length != 0){
                        messages.array()[i].delete();
                    }
                }
            })
            .catch(
                console.error
            );
        }
        else{
            message.channel.fetchMessages()
            .then(messages => {
                for(let i=0; i < messages.array().length; i++){              
                    let ats = messages.array()[i].attachments.array();
                    if(ats.length != 0){
                        messages.array()[i].delete();
                    }
                }
            })
            .catch(
                console.error
            );
        }
    }

    else{
        message.channel.send("You do not have that permission fam");
    }
}

module.exports.info = {
    name: "Purify"
}