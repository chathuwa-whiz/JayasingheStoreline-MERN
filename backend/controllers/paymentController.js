import Payment from "../models/paymentModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createPayment = asyncHandler(async (req, res) => {
  const { cardNumber, cardName, expirationDate, cvv, paymentMethod } = req.body;

  // Validate required fields based on payment method
  if (paymentMethod === 'card') {
    if (!cardNumber || !cardName || !expirationDate || !cvv) {
      res.status(400);
      throw new Error('All card details are required');
    }
  } else if (paymentMethod === 'cod') {
    // Additional validation or handling for COD can be added here if needed
  }

  if (!paymentMethod) {
    res.status(400);
    throw new Error('Payment method is required');
  }

  // Create new payment document
  const payment = new Payment({
    cardNumber: paymentMethod === 'card' ? cardNumber : undefined,
    cardName: paymentMethod === 'card' ? cardName : undefined,
    expirationDate: paymentMethod === 'card' ? expirationDate : undefined,
    cvv: paymentMethod === 'card' ? cvv : undefined,
    paymentMethod
  });

  // Save payment to the database
  const savedPayment = await payment.save();

  res.status(201).json({
    message: 'Payment processed successfully',
    payment: savedPayment
  });
});

export { createPayment };
