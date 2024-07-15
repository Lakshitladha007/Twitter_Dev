import { TweetRepository, HashtagRepository } from '../repository/index.js';

class Tweetservice{
    constructor() {
        this.tweetRepository = new TweetRepository;
        this.hashtagRepository = new HashtagRepository;
    }

    async create(data){
        const content = data.content;
        let tags = content.match(/#[a-zA-Z0-9_]+/g); // this regex extracts hashtags
        tags = tags.map(tag => {    // removing '#' from each hashtag
             return tag.substring(1);
        });

        const tweet = await this.tweetRepository.create(data);  // this fxn is used to create 'tweet'

        let alreadyPresentTags= await this.hashtagRepository.findByName(tags); //  here we get an array of tags which are already present in db
        let titleOfPresentTags = alreadyPresentTags.map((tags) =>tags.title);  
        
        // Now we have an array of tags that are already present in Db, now we need to find the tags which are not presnt in db
        let newTags = tags.filter( tag=> !titleOfPresentTags.includes(tag));
        // the newTags arrays contaning only tags, we need to do processing to convert them into key-value pairs [{title:".....",  tweet:[]}]
        newTags = newTags.map(tag => { 
            return { title: tag, tweets: [tweet.id]}
        })
        await this.hashtagRepository.bulkCreate(newTags);  // the tags which are not present in Db are created using bulkCreate
        alreadyPresentTags.forEach((tag)=> {   // addind tweetId of this tweet in the tags that are already present
            tag.tweets.push(tweet.id);
            tag.save();
        });
        return tweet;
    }
}

export default Tweetservice;

/* (This is how the content of a tweet would look like)

   "this my #first #tweet . I am really #excited"
*/