// In your review routes file (e.g., routes/reviews.js)
import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// GET /api/reviews - Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

export default router;
