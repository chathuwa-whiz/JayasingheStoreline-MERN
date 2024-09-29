import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname : { type : String, required : true, default: "" },
    lastname : { type : String, required : true, default: "" },
    username : { type : String, required : true, default: "" },
    email : { type : String, required : true },
    NIC : { type : String, required : true, default: "" },
    phone : { type : String, required : true, default: "" },
    address : { type : String, required : true, default: "" },
    age : { type : String, required : true, default: "" },
    password : { type : String, required : true },
    isAdmin : { type : Boolean, required : true, default: false }
} , { timestamps : true });

const User = mongoose.model("User", UserSchema);
export default User;