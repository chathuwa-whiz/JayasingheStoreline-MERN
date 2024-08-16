import jwt from 'jsonwebtoken.js';
import User from '../models/UserModel.js';
import asyncHandler from './asyncHandler.js';


const authenticate = asyncHandler(async(req,res,next) => {

    let token;

    token = req.cookie.jwt

    if(token){

        try {

            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select("-password")
            next();
            
        } catch (error) {
            
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
    }
    else{

        res.status(401)
        throw new Error("Not authorized, no token")

    }
});

//check for the admin

const authorizeAdmin = (req,res,next) => {

    if(req.user && req.user.isAdmin){

        next();
    }
    else{

        res.status(401).send("Not authorized as an admin")
    }
}

export {authenticate, authorizeAdmin}






























