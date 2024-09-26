import express from 'express';
import { createPayment } from '../controllers/paymentController.js';
const router = express.Router();

// POST route for creating a payment request
router.route('/').post(createPayment);

export default router;
