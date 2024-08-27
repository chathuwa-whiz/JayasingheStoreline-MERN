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
  }

  if (!paymentMethod) {
    res.status(400);
    throw new Error('Payment method is required');
  }

  // Create new payment document
  const payment = new Payment({
    cardNumber,
    cardName,
    expirationDate,
    cvv,
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
