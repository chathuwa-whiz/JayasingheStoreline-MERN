import express from 'express';
import { getAllReviews } from '../controllers/reviewControllers.js';
import Review from '../models/Review.js';

const router = express.Router();

// Define GET route for /api/reviews
router.get('/', getAllReviews);

// Define POST route for /api/reviews
router.post('/', async (req, res) => {
  const { rating, comment, photos, video, checkboxes } = req.body;

  try {
    if (!rating || !comment.trim()) {
      return res.status(400).json({ message: 'Rating and comment are required.' });
    }

    const newReview = new Review({ rating, comment, photos, video, checkboxes });
    await newReview.save();

    res.status(201).json({ message: 'Review submitted successfully!' });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ message: 'Failed to submit review.', error: error.message });
  }
});

export default router;
