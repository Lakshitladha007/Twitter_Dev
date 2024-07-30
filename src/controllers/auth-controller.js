import UserService  from "../services/user-service.js";
import User from '../models/user.js'

const userService= new UserService();

export const signup= async (req, res)=>{
     try {
        const response = await userService.signup({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        return res.status(201).json({
            message: "Successfully created a new user",
            success: true,
            err:{},
            data: response  
        })
    } catch (error) {
        return res.status(500).json({
            message: "Cannot create a user",
            success: false,
            err: error,
            data: {}
        })
    }
}

export const login = async (req, res)=>{
    try {
        const token= await userService.signIn(req.body);
        return res.status(200).json({
            success: true,
            message:"Successfully logged in",
            data: token,
            err: {}
            });
    }catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            err: error,
            data: {}
        });
    }
}
