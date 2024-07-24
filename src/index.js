import express from "express"
import { connect } from "./config/database.js"
import apiRoutes from "./routes/index.js"
import bodyParser from "body-parser";

import { UserRepository, TweetRepository } from "./repository/index.js";
import LikeService from "./services/like-service.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

const PORT=3000;
app.listen(PORT, async()=>{
    console.log(`Server started at PORT: ${PORT}`);
    await connect();
    console.log("Mongo Db connected"); 
});
