import Payment from "../models/paymentModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createPayment = asyncHandler(async (req, res) => {
  const { cardNumber, cardName, expirationDate, cvv, paymentMethod, orderId } = req.body;

  // Log the incoming request data for debugging
  console.log('Request Body:', req.body);

  // Validate required fields based on payment method
  if (paymentMethod === 'card') {
    if (!cardNumber || !cardName || !expirationDate || !cvv) {
      res.status(400);
      throw new Error('All card details are required');
    }
  } else if (paymentMethod === 'cod') {
    // Ensure no card-related fields are required for COD
    if (orderId === undefined) {
      res.status(400);
      throw new Error('Order ID is required for COD payments');
    }
  } else {
    res.status(400);
    throw new Error('Invalid payment method');
  }

  // Create new payment document
  const payment = new Payment({
    cardNumber: paymentMethod === 'card' ? cardNumber : undefined,
    cardName: paymentMethod === 'card' ? cardName : undefined,
    expirationDate: paymentMethod === 'card' ? expirationDate : undefined,
    cvv: paymentMethod === 'card' ? cvv : undefined,
    paymentMethod,
    orderId: paymentMethod === 'cod' ? orderId : undefined // Store orderId if needed
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
