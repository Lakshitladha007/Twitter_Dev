const { TweetRepository } = require("../respository/index");

class Tweetservice{
    constructor() {
        this.tweetRepository = new TweetRepository;
    }

    async create(data){
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g); // this regex extracts hashtags
        tags = tags.map((tag) => {
             tag.substring(1)
        });
        console.log(tags);
        const tweet = await this.tweetRepository.create(data);
        return tweet;
    }
}

module.exports = Tweetservice;

/* (This is how the content of a tweet would look like)

   "this my #first #tweet . I am really #excited"
*/