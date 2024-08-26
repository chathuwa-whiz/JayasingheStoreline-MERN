import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    cardNumber :{
        type : String,
        required : true
    },
    NameOnCard : {
        type : String,
        required : true
    },
    ExpirationDate : {
        type : Date,
        required : true
    },
    CVV : {
        type : String ,
        required : true
    },
    isadmin : {
        type : Boolean,
        required : true,
        default : false
    },
},{timestamps : true}
)

const Payment = mongoose.model('Payment',paymentSchema);
export default Payment;