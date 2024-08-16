import User from "../models/UserModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createUser = asyncHandler(async(req,res) => {

    const {username, password, email} = req.body;
    
    if(!username || !password || !email){

        throw new Error("Please fill all the inputs...")
    }

    const userExists = await User.findOne({email});
    if(userExists){

        res.status(400).send("User already Exists");
    }

    const newUser = new User({username, email, password})

    try{


        await newUser.save()
        res.status(201).json({_id: newUser._id, username: newUser.username, email: newUser.email, isAdmin: newUser.isAdmin})
    }catch(error){

        res.status(400)
        throw new Error("Invalid user data..." + console.log(error))
    }
})

export {createUser};