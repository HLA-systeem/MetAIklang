const CLARAFAI = require('clarifai');
const DANBOORU = require('danbooru');
const BOORU = new DANBOORU();
const MEM = require('./memories');

const VISION = new CLARAFAI.App({
    apiKey: require('./settings/botSettings.json').clairKey
   });

module.exports.look = (message, image) => { //make this an array in the future
    VISION.models.predict("MetAIklang Vision", image).then(
        function(res) {
            let predictions = res.outputs[0].data.concepts[0].value; //check if it's the doremy concept in the future
            let judge = Math.floor(predictions * 100);
            console.log(judge);
            if(judge > 70){
                message.channel.send(message.author + " needs to be purified");
                MEM.rememberImage(message,image);
                message.delete()

                BOORU.posts({ tags: 'rating:safe junko_(touhou)' }).then(
                    function(posts){
                        let index = Math.floor(Math.random() * posts.length); // Select a random post from posts array
                        let post = posts[index];
                        let url = BOORU.url(post.file_url)  // Get post's url
                        message.channel.send(url.href);
                  },
                  function(err) {
                    console.log(err);
                    }
                );
            }
        },
        function(err) {
            console.log(err);
        }
      );   
}