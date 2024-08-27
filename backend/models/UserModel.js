import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname : { type : String, required : true, default: "" },
    // lastname : { type : String, required : true },
    username : { type : String, required : true },
    email : { type : String, required : true },
    // address : { type : String, required : true },
    password : { type : String, required : true },
    isAdmin : { type : Boolean, required : true, default: false }
} , { timestamps : true });

const User = mongoose.model("User", UserSchema);
export default User;