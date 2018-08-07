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
                if(judge > 98){
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
                            if(message.channel.nsfw == true){
                                BOORU.posts({ tags: 'rating:explicit junko_(touhou)' })
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
                            else{
                                BOORU.posts({ tags: 'rating:safe junko_(touhou)' })
                                    .then(
                                        (posts) => {
                                            let index = Math.floor(Math.random() * posts.length); 
                                            let post = posts[index];
                                            let url = BOORU.url(post.file_url)
                                            message.channel.send(url.href);
                                        }
                                    )
                                    .catch(err => console.log(err));
                                }
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

module.exports.sample = (conceptName, images) => {
    let results = [];
    let i = 0;
    
    return new Promise((resolve,reject) =>{
        for(let image of images){
            VISION.models.predict("MetAIklang Vision", image).then(
                (res) => {
                    let concepts = res.outputs[0].data.concepts;
                    for(let concept of concepts){
                        if(concept.name == conceptName){
                            let prediction = concept.value; 
                            let judge = Math.floor(prediction * 100);
                            results.push(judge);
                            i += 1;
                            if(i == images.length){
                                resolve(results);
                            }
                        }
                    }
                },
                (err) => {
                    reject(err);
                }
            );
        }
    });
}

module.exports.add = (images,concept,type,message) => {
    let i = 0;
    for(let image of images){
        VISION.inputs.create({
            url: image,
            concepts: [{
                id: concept,
                name:concept,
                value: type
            }]
        })
        .then(
            (res) => {
                i += 1;
                if(i == images.length){
                    VISION.models.train("MetAIklang Vision").then(
                        function(res) {
                            message.channel.send("Sample successfully added.");
                        },
                        function(err) {
                            console.log('is this?');
                            message.channel.send("Somenthing went wrong. Sample adding failed.");
                        }
                    );
                }
            },
            (err) => {
                console.log(err);
            }
        )  
    }
}