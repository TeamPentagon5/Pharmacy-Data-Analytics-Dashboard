import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import { MAX_JSON_SIZE, MONGODB_CONNECTION, PORT, REQUEST_LIMIT_NUMBER, REQUEST_LIMIT_TIME, URL_ENCODED, WEB_CACHE } from "./app/config/config.js";
import router from "./routes/api.js";

const app = express();
//app use default Middleware
app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(helmet())


//App Use Limiter

const limiter=rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER})
app.use(limiter)


//Cache
app.set('etag',WEB_CACHE)


// MongoDB connection
mongoose.connect(MONGODB_CONNECTION,{autoIndex:true}).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err=>{
    console.log("Error connecting to MongoDB");
})


app.use("/api",router)


// Run Your Express Back End Project

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})


