import express from 'express';
import mongoose from 'mongoose';
import Reply from '../models/Replymodel.js';

const router = express.Router();
// POST /api/replyRoutes/:inquiryId
router.post('/:inquiryId', async (req, res) => {
  try {
    const { replyText } = req.body;
    const { inquiryId } = req.params;

    // Validate that the replyText is provided and within the character limit
    if (!replyText || replyText.trim().length < 1 || replyText.trim().length > 500) {
      return res.status(400).json({ message: 'Reply text must be between 1 and 500 characters.' });
    }

    // Validate that the inquiryId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
      return res.status(400).json({ message: 'Invalid inquiry ID format.' });
    }

    // Create a new reply and save it to the database
    const newReply = new Reply({ inquiryId, replyText });
    const savedReply = await newReply.save();

    // Return the newly created reply
    res.status(201).json(savedReply);
  } catch (err) {
    console.error('Error saving reply:', err);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

// GET /api/replyRoutes/:inquiryId
router.get('/:inquiryId', async (req, res) => {
  try {
    const { inquiryId } = req.params;

    // Validate that the inquiryId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(inquiryId)) {
      return res.status(400).json({ message: 'Invalid inquiry ID format.' });
    }

    // Fetch all replies associated with the inquiryId
    const replies = await Reply.find({ inquiryId }).sort({ createdAt: -1 });

    // Return the list of replies
    res.status(200).json(replies);
  } catch (err) {
    console.error('Error fetching replies:', err);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});


export default router;
