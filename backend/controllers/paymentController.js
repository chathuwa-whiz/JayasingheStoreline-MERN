import Payment from "../models/paymentModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createPayment = asyncHandler(async (req, res) => {
   const {cardNumber, NameOnCard, ExpirationDate, CVV} = req.body;
   if(!cardNumber || !NameOnCard || !ExpirationDate || !CVV){
       res.status(400);
       throw new Error("Please fill all the fields");
   }
});

export { createPayment };