import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    itemsPrice : { type : Number, required : true, default : 0 },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;