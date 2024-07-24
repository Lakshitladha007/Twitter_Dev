import { LikeRepository, TweetRepository } from "../repository/index.js";

class LikeService{
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId){  // /api/v1/likes/toggle?id=modelid&type=tweet
        if(modelType=='Tweet'){
           var likeable= await this.tweetRepository.find(modelId); 
          //  console.log(likeable);// since we used 'var' so likeable is going to have function scope
        }else if(modelType=="Comment"){
           // TODO
        }else{
           throw new Error("Unknown model type");
        }
        
        const exists= await this.likeRepository.findByUserAndLikeable({  // it tells whether a 'like' exists by current user on a tweet/comment model
            user: userId,
            onModel: modelType, 
            likeable: modelId,
        });
        // console.log(exists);
        if(exists){  // we need to remove the like
         
          likeable.likes.pull(exists);
          await likeable.save();
          await this.likeRepository.destroy(exists.id);
          var isAdded=true; 
        
        }else{  // we need to create a like
          const newLike= await this.likeRepository.create({
            onModel: modelType,
            likeable: modelId,
            user: userId
          });
          likeable.likes.push(newLike);
          await likeable.save();
          
          var isAdded= false;
        }

        return isAdded;
    }
}

export default LikeService;