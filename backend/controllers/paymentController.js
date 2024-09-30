import Payment from "../models/paymentModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Controller to handle payment creation
const createPayment = asyncHandler(async (req, res) => {
  const { 
    amount, 
    paymentMethod, 
    cardNumber, 
    cardName, 
    cardExpiry, 
    cardCVV, 
    bankAccount, 
    paymentDetails, 
    orderId 
  } = req.body;

  // Log the incoming request data for debugging
  console.log('Request Body:', req.body);

  // Validate required fields based on payment method
  if (paymentMethod === 'card') {
    if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
      res.status(400);
      throw new Error('All card details are required');
    }
  } else if (paymentMethod === 'bank') {
    if (!bankAccount || !paymentDetails) {
      res.status(400);
      throw new Error('Bank account and payment details are required');
    }
  } else {
    res.status(400);
    throw new Error('Invalid payment method');
  }

  // Create new payment document
  const payment = new Payment({
    amount,
    paymentMethod,
    cardNumber: paymentMethod === 'card' ? cardNumber : undefined,
    cardName: paymentMethod === 'card' ? cardName : undefined,
    cardExpiry: paymentMethod === 'card' ? cardExpiry : undefined,
    cardCVV: paymentMethod === 'card' ? cardCVV : undefined,
    bankAccount: paymentMethod === 'bank' ? bankAccount : undefined,
    paymentDetails: paymentMethod === 'bank' ? paymentDetails : undefined,
    orderId
  });

  // Log before saving the payment document
  console.log('Saving Payment:', payment);

  // Save payment to the database
  const savedPayment = await payment.save();

  // Log the result after saving
  console.log('Saved Payment:', savedPayment);

  res.status(201).json({
    message: 'Payment processed successfully',
    payment: savedPayment
  });
});

export { createPayment };
