import express from 'express';
import { addDelivery, getDeliveries, updateDelivery, deleteDelivery } from '../controllers/DeliveryController.js';
import formidable from 'express-formidable';

const router = express.Router();

// Define routes
router.post('/', formidable(), addDelivery); // Create a new delivery
router.get('/', getDeliveries); // Get all deliveries
router.put('/:id', updateDelivery); // Update an existing delivery
router.delete('/:id', deleteDelivery); // Delete a delivery

export default router;
