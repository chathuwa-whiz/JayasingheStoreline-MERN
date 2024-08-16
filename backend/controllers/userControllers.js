import User from "../models/UserModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async(req,res) => {

    const {username, password, email} = req.body;
    
    if(!username || !password || !email){

        throw new Error("Please fill all the inputs...")
    }

    const userExists = await User.findOne({email});
    if(userExists){

        res.status(400).send("User already Exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({username, email, password: hashPassword})

    try{
        await newUser.save()
        createToken(res, newUser._id)

        res.status(201).json({_id: newUser._id, username: newUser.username, email: newUser.email, isAdmin: newUser.isAdmin})
    }catch(error){

        res.status(400)
        throw new Error("Invalid user data..." + console.log(error))
    }
})

const loginUser = asyncHandler(async(req,res) => {

    const {emial,password} = req.body;

    const exsitingUser = await User.findOne({email});

    if(exsitingUser){

        const isPasswordValid = await bcrypt.compare(password, exsitingUser.password);

        if(isPasswordValid){

            createToken(res, exsitingUser._id)
            res.status(201).json({_id: exsitingUser._id, username: exsitingUser.username, email: exsitingUser.email, isAdmin: exsitingUser.isAdmin});
            return;
        }
    }
})

export {createUser};