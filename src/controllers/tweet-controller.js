import Tweetservice from "../services/tweet-service.js"

const tweetService = new Tweetservice();

export const createTweet = async(req, res) => {
    try {
        const response = await tweetService.create(req.body);
        return res.status(201).json({
            message: "Successfully created a new tweet",
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
