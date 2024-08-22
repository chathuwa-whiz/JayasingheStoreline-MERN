import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    name : { type : String, required : true },
    image : { type : String, required : true },
    phone : { type : String, required : true, default : "" },
    email : { type : String, required : true, default : "" },
    gender : { type : String, required : true, default : "" },
    Type : { type : String, required : true, default : "" },
    
} , { timestamps : true });

const Product = mongoose.model("Supplier", supplierSchema);
export default Product;