const CLARAFAI = require('clarifai');

const VISION = new Clarifai.App({
    apiKey: require('./settings/botSettings.json').clairKey
   });

module.exports.look = (message, image) => { //make this an array in the future
    VISION.models.predict("MetAIklang Vision", image).then(
        function(res) {
            let predictions = res.outputs[0].data.concepts[0].value; //check if it's the doremy concept in the future
            let judge = Math.floor(predictions * 100);
            console.log(judge);
            message.channel.send("I am " + judge + "% sure that I hate that image");
        },
        function(err) {
            let judge = err;
            console.log(judge);
        }
      );   
}