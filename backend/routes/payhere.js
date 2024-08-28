import express from 'express';
import crypto from 'crypto'; // Import crypto for handling signatures

const router = express.Router();

router.post('/notify', (req, res) => {
  const { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig } = req.body;
  
  const secret = process.env.PAYHERE_SECRET_KEY; // Use environment variable for the secret

  // Ensure all required fields are present
  if (!merchant_id || !order_id || !payhere_amount || !payhere_currency || !status_code || !md5sig) {
    return res.status(400).send('Missing required fields');
  }

  // Compute the signature using your secret key
  const computedSignature = crypto
    .createHash('md5')
    .update(`${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${secret}`)
    .digest('hex');

  // Verify the signature
  if (md5sig === computedSignature) {
    if (status_code === '2') {
      // Payment is successful, update the order status in your database
      console.log('Payment successful for order ID:', order_id);
      // Update order status in your database
    }
    res.sendStatus(200);
  } else {
    console.log('Invalid signature');
    res.sendStatus(400);
  }
});

export default router;
