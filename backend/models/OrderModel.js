import mongoose from "mongoose";

const deliveryDetailsSchema = new mongoose.Schema({
    firstName:{type:String,required:true,default:""},
    lastName:{type:String,required:true,default:""},
    telephoneNo:{type:String,required:true,default:""},
    address:{type:String,required:true,default:""},
    city:{type:String,required:true,default:""},
    province:{type:String,required:true,default:""},
    postalCode:{type:String,required:true,default:""},
    paypal:{type:String,required:true,default:""},

},{timestamps : true});

const OrderSchema = new mongoose.Schema({
    itemsPrice : { type:Number, required:true, default:0 },
    deliveryPrice :{ type:Number, required :true, default:0 },
    discount:{ type:Number, required:true, default:0 },
    totalPrice:{ type:Number, required:true, default:0 },
    status:{ type:String, required:true, default:"Pending" },
    
    orderItems : { type:Array, required:true, default:[] },
    firstName:{ type:String, required:true, default:"" },
    lastName:{ type:String, required:true, default:"" },
    telephoneNo:{ type:String, required:true, default:"" },
    address:{ type:String, required:true, default:"" },
    city:{ type:String, required:true, default:"" },
    province:{ type:String, required:true, default:"" },
    postalCode:{ type:String, required:true, default:"" },
    paymentMethod:{ type:String, required:true, default:"" }

},{timestamps :true});

const Order = mongoose.model("Order", OrderSchema);
export default Order;