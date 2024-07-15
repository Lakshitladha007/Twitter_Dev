import express from "express"
import { connect } from "./config/database.js"
const app = express();

import Tweetservice from "./services/tweet-service.js"
const setUpAndStartServer= async () => {
const PORT=3000;
    app.listen(PORT, async()=>{
        console.log(`Server started at PORT: ${PORT}`);
        await connect();
        console.log("Mongo Db connected");
        const service= new Tweetservice();
        const tweet= await service.create({ content: "Done with #refactor"});
        console.log(tweet);

    });
}

setUpAndStartServer();