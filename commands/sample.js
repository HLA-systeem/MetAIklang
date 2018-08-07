const VISION = require('../vision');
const DISCORD = require('discord.js');

var images = [];
var concept = "";

module.exports.run = async (bot,message,args) => {
    if(message.member.roles.find("name","Metaklangs Front Office") || message.member.roles.find("name","Metalking") || message.member.roles.find("name", "testing room pass")){
        if(args.length == 0){
            message.channel.send("Please provide a concept and sample links");
        }

        else{
            if(args[0] == "pos"){
                VISION.add(images,concept,true,message);
            }

            else if(args[0] == "neg"){
                VISION.add(images,concept,false,message);
            }

            else if(args.length == 1){
                console.log(images);
            }

            else{
                if(args[0] == "doremy" && args[1] == "sweet"){
                    concept = "doremy sweet";
                    args.splice(0, 2); 
                    let results = await VISION.sample(concept, args)
                    .then(results => {
                        images = args;
                        showResults(results,concept, message);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
                else if(args[0] == "junko"){
                    concept = "junko";
                    args.splice(0, 1);
                    let results = await VISION.sample(concept, args)
                        .then(results => {
                            images = args;
                            showResults(results,concept, message);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                
                }
                else{
                    message.channel.send("That concept is not implemented");
                }
            }
        }
    }
    else{
        message.channel.send("First, join the the development team");
    }
}

module.exports.info = {
    name: "Sample"
}


function showResults(results,concept,message){
    let resultMessage = new DISCORD.RichEmbed()
    .setTitle("SampleResults")
    .setColor("#E6E6FA");

    let i = 0; 
    for(result of results){
        i += 1;
        resultMessage.addField("image " + i, result + "% sure it's " + concept)
    }

    resultMessage.addField("Type 'metaSample pos'", "To add these images as a positive example for the concept");
    resultMessage.addField("Type 'metaSample neg'", "To add these images as a negative example for the concept");
    message.channel.send(resultMessage);
}


//Alow the user to input whenever it's correct or not

