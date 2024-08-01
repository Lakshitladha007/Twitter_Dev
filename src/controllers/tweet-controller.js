import Tweetservice from "../services/tweet-service.js"
import upload from '../config/file-upload-s3-config.js';

const singleUploader = upload.single('image');

const tweetService = new Tweetservice();

export const createTweet = async (req, res) => {
    try {
        singleUploader(req, res, async function(err, data){
            if(err){
                return res.status(500).json({
                      error: err
                });
            }
            console.log('image url is', req.file);
            const payload ={...req.body};
            payload.image= req.file.location;
            const response = await tweetService.create(payload);
            return res.status(201).json({
            message: "Successfully created a new tweet",
            success: true,
            err:{},
            data: response  
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: true,
            err: error,
            data: {}
        })
    }
}

export const getTweet = async(req, res) => {
    try {
        const response = await tweetService.get(req.params.id);
        return res.status(201).json({
            message: "Successfully fetched a tweet",
            success: true,
            err:{},
            data: response  
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: true,
            err: error,
            data: {}
        })
    }
}