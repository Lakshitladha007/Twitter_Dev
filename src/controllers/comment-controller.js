import CommentService from "../services/comment-service.js";

const commentService = new CommentService();

export const createComment= async (req, res)=>{
    try {
        const response= await commentService.create( req.query.modelType, req.query.modelId,req.body.userId, req.body.content);
        return res.status(200).json({
            message: "Successfully created a new comment",
            success: true,
            err:{},
            data: response  
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            err: error,
            data: {}
        })
    }
}


