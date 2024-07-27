import { CommentRepository, TweetRepository } from "../repository/index.js"; 

class CommentService{
    constructor(){
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async create( modelType, modelId, userId, content){
        if(modelType=='Tweet'){
            console.log(modelType, modelId, userId, content);
            var commentable= await this.tweetRepository.get(modelId);
        }else if(modelType=="Comment"){
            var commentable= await this.commentRepository.get(modelId);
        }else{
            throw new Error("Unknown model type");
        }
        const comment= await this.commentRepository.create({
            content: content,
            userId: userId,
            onModel: modelType,
            commentable: modelId,
            comments: []
        });
        commentable.comments.push(comment);  // commentable is the "Tweet" or "Comment" on which comment is going to be made
                                             // now this tweet/comment i.e. commentable has a comments array, in which we push the current comment
        await commentable.save();

        return comment;
    }
}

export default CommentService;