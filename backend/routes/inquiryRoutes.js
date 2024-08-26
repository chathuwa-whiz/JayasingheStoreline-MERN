import express from 'express';
import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// GET all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().exec();
    res.status(200).json(inquiries);
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});
// POST /api/inquiryRoutes
router.post('/', async (req, res) => {
  try {
    const { message, userId } = req.body;

    // Validate that the message and userId are provided
    if (!message || !userId) {
      return res.status(400).json({ message: 'Message and user ID are required.' });
    }

    // Validate the userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    // Create a new inquiry and save it to the database
    const newInquiry = new Inquiry({ message, userId: mongoose.Types.ObjectId(userId) });
    const savedInquiry = await newInquiry.save();

    // Return the newly created inquiry
    res.status(201).json(savedInquiry);
  } catch (err) {
    console.error('Error saving inquiry:', err);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});


// GET a specific inquiry by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid inquiry ID format.' });
    }

    const inquiry = await Inquiry.findById(id).exec();

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found.' });
    }

    res.status(200).json(inquiry);
  } catch (err) {
    console.error('Error fetching inquiry:', err);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});
// POST /api/inquiryRoutes
router.post('/', async (req, res) => {
  try {
    const { message, userId } = req.body;

    // Validate that the message and userId are provided
    if (!message || !userId) {
      return res.status(400).json({ message: 'Message and user ID are required.' });
    }

    // Validate the userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    // Create a new inquiry and save it to the database
    const newInquiry = new Inquiry({ message, userId: mongoose.Types.ObjectId(userId) });
    const savedInquiry = await newInquiry.save();

    // Return the newly created inquiry
    res.status(201).json(savedInquiry);
  } catch (err) {
    console.error('Error saving inquiry:', err);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});


export default router;
