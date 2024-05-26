const express= require("express");
const connect = require("./config/database")
const app = express();

const TweetRepopsitory = require('./respository/tweet-repository');
const Comment = require('./models/comment');

const { PORT } = require('./config/serverConfig');
const setUpAndStartServer= async () => {

    app.listen(PORT, async()=>{
        console.log(`Server started at PORT: ${PORT}`);
        await connect();
        console.log("Mongo Db connected");
        const repo = new TweetRepopsitory();
        // const tweet = await repo.create({ content: "Tweet with a comment schema"});
        // const comment = await Comment.create({content: "new comment"});
        // console.log(tweet);
        // tweet.comments.push(comment);
        // await tweet.save();
        // console.log(tweet);
        const tweet= await repo.getwithComments('665318befe5260e3363c13a3');
        console.log(tweet);
    })
     
}

setUpAndStartServer();