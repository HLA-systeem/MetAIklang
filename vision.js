const CLARAFAI = require('clarifai');
const DANBOORU = require('danbooru');
const BOORU = new DANBOORU();
const MEM = require('./memories');

const VISION = new CLARAFAI.App({
    apiKey: require('./settings/botSettings.json').clairKey
   });

module.exports.look = (message, image) => { //make this an array in the future
    VISION.models.predict("MetAIklang Vision", image).then(
        (res) => {
            let predictions = res.outputs[0].data.concepts[0].value; 
            let judge = Math.floor(predictions * 100);
            console.log(judge + ' ' + res.outputs[0].data.concepts[0].name);
            if(res.outputs[0].data.concepts[0].name == "doremy sweet"){
                
                if(judge > 90){
                    message.channel.send(message.author + " needs to be purified");
                
                    MEM.rememberImage(message,image)
                        .then((res) => {
                            message.delete()
                                .then((res) =>{
                                    return res;
                                }
                                )
                                .catch((err) => {
                                    console.log(err);
                                });
                            } 
                        )
                        .then(res => {
                            BOORU.posts({ tags: 'rating:safe junko_(touhou)' })
                                .then(
                                    (posts) => {
                                        let index = Math.floor(Math.random() * posts.length); // Select a random post from posts array
                                        let post = posts[index];
                                        let url = BOORU.url(post.file_url)  // Get post's url
                                        message.channel.send(url.href);
                                    }
                                )
                                .catch(err => console.log(err));
                            }
                        )
                        .catch(err => console.log(err));
                }
            }
        },
        (err) => {
            console.log(err);
        }
      );   
}