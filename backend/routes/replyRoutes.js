import express from 'express';
import Reply from '../models/Replymodel.js'; // Ensure the correct path

const router = express.Router();

// POST route to create a new reply for a specific inquiry
router.post('/:id', async (req, res) => {
  try {
    const { replyText } = req.body;
    const { id } = req.params; // Get inquiry ID from URL parameters

    // Validate reply text
    if (!replyText || replyText.trim().length < 1 || replyText.trim().length > 500) {
      return res.status(400).json({ message: "Reply text between 1 and 500 characters is required." });
    }

    // Create a new reply
    const newReply = new Reply({
      inquiryId: id,
      replyText,
    });

    // Save the reply to the database
    const savedReply = await newReply.save();

    // Return the saved reply
    res.status(201).json(savedReply);
  } catch (err) {
    console.error('Error saving reply:', err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// GET route to fetch all replies for a specific inquiry
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get inquiry ID from URL parameters

    // Fetch all replies related to the specified inquiry
    const replies = await Reply.find({ inquiryId: id }).sort({ createdAt: -1 });

    // Return the list of replies
    res.status(200).json(replies);
  } catch (err) {
    console.error('Error fetching replies:', err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// GET route to fetch replies by inquiry ID
router.get('/:inquiryId', async (req, res) => {
    try {
      const { inquiryId } = req.params;
      console.log(`Fetching replies for inquiryId: ${inquiryId}`);
      const replies = await Reply.find({ inquiryId });
      console.log('Replies fetched:', replies);
      res.json(replies);
    } catch (err) {
      console.error('Error fetching replies:', err);
      res.status(500).json({ message: 'Failed to load replies.' });
    }
  });
  
  
export default router;
