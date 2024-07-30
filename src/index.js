import express from "express"
import bodyParser from "body-parser";
import passport from "passport";

import { connect } from "./config/database.js"

import { passportAuth } from "./config/jwt-middleware.js";

import apiRoutes from "./routes/index.js"

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
passportAuth(passport);


app.use('/api', apiRoutes);

const PORT=3000;
app.listen(PORT, async()=>{
    console.log(`Server started at PORT: ${PORT}`);
    await connect();
    console.log("Mongo Db connected"); 
});
