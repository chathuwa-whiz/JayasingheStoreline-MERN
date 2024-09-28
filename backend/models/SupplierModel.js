import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    name : { type : String, required : true, default : "" },
    nic : { type : Number, required : true, default : 0 },
    image : { type : String, required : true, default : "" },
    phone : { type : String, required : true, default : "" },
    email : { type : String, required : true, default : "" },
    gender : { type : String, required : true, default : "" },
    type : { type : String, required : true, default : "" }
    
} , { timestamps : true });

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;