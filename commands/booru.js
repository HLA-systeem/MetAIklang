const DANBOORU = require('danbooru');
const BOORU = new DANBOORU();

module.exports.run = async (bot,message,args) => {
    console.log(args[0]);
    if(args[0] == "nsfw"){
        if(args[1] == "guro" || args[1] == "loli" || args[1] == "doremy_sweet"){
            message.channel.send("https://www.betterhelp.com/");
        }
        else{
            if(message.channel.nsfw == true ){
                rando = Math.floor(Math.random() * 3);
                let rating = "rating:questionable";
                
                if (rando == 0){
                    rating = 'rating:explicit';
                }

                console.log(rando);
                console.log(rating);

                BOORU.posts({ tags: rating + ' ' + args[1] })
                .then(
                    (posts) => {
                        let index = Math.floor(Math.random() * posts.length); // Select a random post from posts array
                        let post = posts[index];
                        let url = BOORU.url(post.file_url)  // Get post's url
                        message.channel.send(url.href);
                    }
                )
                .catch(err => message.channel.send("Nothing turned up."));         
            }
            else{
                message.channel.send("Rule 3. No Hentai in the main chat, keep it in the NSFW.... (it better be good tho)");
            }
        }
    }
    else{
        BOORU.posts({ tags: 'rating:safe ' + args[0] })
        .then(
            (posts) => {
                let index = Math.floor(Math.random() * posts.length);
                let post = posts[index];
                let url = BOORU.url(post.file_url);
                message.channel.send(url.href);
            }
        )
        .catch(err => message.channel.send("Nothing turned up."));
    }




}

module.exports.info = {
    name: "Booru"
}