import Tweet from '../models/tweet.js'
import CrudRepository from "./crud-repository.js";

class TweetRepository extends CrudRepository {
    
    constructor(){
         super(Tweet);
    }

    async create(data) {
         try {
            const tweet= await Tweet.create(data);
            return tweet;
         } catch (error) {
            console.log(error);
         }
    }

    async getwithComments(id){
         try {
            const tweet = await Tweet.findById(id).populate({ path: 'comments', populate : { path : 'comments' }  }).lean(); 
            // generally, populate directly works when we have a general association, but here we kept an array of comments so we 
            // need to pass { path: "comments"}
            return tweet;                                                                 
         } catch (error) {
            console.log(error);
         }
    }
 
   // This 'update' fxn bydefault returns the ' old document ' even after updating, although in database we have updated object.
   // To get updated document, we add property { new: true } with the fxn.
   // If we don't pass { new: true }, we will get access to old document
   //  async update(tweetId, data){
   //      try {
   //          const tweet= await Tweet.findByIdAndUpdate(tweetId, data, {new : true});
   //          return tweet;
   //       } catch (error) {
   //          console.log(error);
   //       }
   //  }
   // Note: We have commented this fxn because we don't want user to update a tweet

    async getAll(offset, limit){
      try {
         const tweet= await Tweet.find().skip(offset).limit(limit);
         return tweet;
      } catch (error) {
         console.log(error);
      }
    }

    async find(id){
      try {
         const tweet = await Tweet.findById(id).populate({ path: 'likes'});
         return tweet;
      } catch (error) {
         console.log(error);
      }
    }

}

export default TweetRepository;