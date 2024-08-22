import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    itemsPrice : { type : Number, required : true,default :0 },
    deliveryPrice : { type : Number, required : true, default : 0 },
    discount: { type : Number, required : true, default : 0 },
    totalprice : { type : Number, required : true, default : 0 },
    status : { type : String,  required : true,default:"Pending" },
    //date
    
} , { timestamps : true });

const Order = mongoose.model("Order", OrderSchema);
export default Order;

// module.exports = Product = mongoose.model("product" , ProductSchema);