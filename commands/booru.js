const DANBOORU = require('danbooru');
const BOORU = new DANBOORU();

module.exports.run = async (bot,message,args) => {
    console.log(args);
    if(args[0] == "nsfw"){
        if(message.channel.nsfw == true ){
            BOORU.posts({ tags: 'rating:explicit ' + args[1] })
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
            message.channel.send("Rule 3. No Hentai in the main chat, keep it in the NSFW.... (it better be good tho)");
        }
    }
    else{
        BOORU.posts({ tags: 'rating:safe ' + + args[0] })
        .then(
            (posts) => {
                console.log("t3");
                let index = Math.floor(Math.random() * posts.length);
                let post = posts[index];
                let url = BOORU.url(post.file_url) 
                message.channel.send(url.href);
            }
        )
        .catch(err => console.log(err));
    }




}

module.exports.info = {
    name: "Booru"
}