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
    });
}

setUpAndStartServer();