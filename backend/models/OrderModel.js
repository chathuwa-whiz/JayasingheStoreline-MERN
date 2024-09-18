import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

    orderId: { type: String, required: true, unique: true},
    itemsPrice : { type:Number, required:true, default:0 },
    deliveryPrice :{ type:Number, required :true, default:0 },
    discount:{ type:Number, required:true, default:0 },
    totalPrice:{ type:Number, required:true, default:0 },
    status:{ type:String, required:true, default:"Pending" },
    
    orderItems : { type:Array, required:true, default:[] },
    // orderItems: [
    //     {
    //         _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    //         name: String,
    //         qty: Number,
    //         // other fields
    //     }
    // ],
    firstName:{ type:String, required:true, default:"" },
    lastName:{ type:String, required:true, default:"" },
    telephoneNo:{ type:String, required:true, default:"" },
    address:{ type:String, required:true, default:"" },
    city:{ type:String, required:true, default:"" },
    province:{ type:String, required:true, default:"" },
    postalCode:{ type:String, required:true, default:"" },
    //paymentMethod:{ type:String, required:true, default:"" }

},{timestamps :true});

const Order = mongoose.model("Order", OrderSchema);
export default Order;