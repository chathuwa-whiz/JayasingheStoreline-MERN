import express from 'express';
import UserInquiry from '../models/Inquiry.js';  // Ensure correct path

const router = express.Router();

// POST route to create a new user inquiry
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    // Validate required fields
    if (!message || message.trim().length < 1 || message.trim().length > 200) {
      return res.status(400).json({ message: "Message between 1 and 200 characters is required." });
    }

    // Create a new user inquiry with the validated data
    const newInquiry = new UserInquiry({ message });

    // Save the user inquiry to the database
    const savedInquiry = await newInquiry.save();

    // Return the saved inquiry in the response
    res.status(201).json(savedInquiry);
  } catch (err) {
    console.error('Error saving inquiry:', err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// GET route to fetch all user inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await UserInquiry.find();  // Fetch all inquiries from the database
    res.status(200).json(inquiries);  // Return the list of inquiries in the response
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// GET route to fetch a specific user inquiry by ID
router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params; // Get ID from URL parameters
      const inquiry = await UserInquiry.findById(id); // Fetch inquiry by ID
  
      if (!inquiry) {
        return res.status(404).json({ message: 'Inquiry not found.' }); // Handle case where inquiry is not found
      }
  
      res.status(200).json(inquiry); // Return the found inquiry
    } catch (err) {
      console.error('Error fetching inquiry:', err);
      res.status(500).json({ message: 'Server error, please try again later.' });
    }
  });

export default router;
