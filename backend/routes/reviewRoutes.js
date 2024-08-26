// src/routes/reviewRoutes.js
import express from 'express';
import Review from '../models/Review.js';  // Ensure correct path

const router = express.Router();

// POST route to create a new review
router.post('/', async (req, res) => {
  try {
    const { rating, comment, photos, video, checkboxes } = req.body;

    // Validate required fields
    if (!rating || !comment || comment.trim().length < 1 || comment.trim().length > 200) {
      return res.status(400).json({ message: "Rating and a comment between 1 and 200 characters are required." });
    }

    // Create a new review with the validated data
    const newReview = new Review({ rating, comment, photos, video, checkboxes });

    // Save the review to the database
    const savedReview = await newReview.save();

    // Return the saved review in the response
    res.status(201).json(savedReview);
  } catch (err) {
    console.error('Error saving review:', err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// GET route to fetch all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();  // Fetch all reviews from the database
    res.status(200).json(reviews);  // Return the list of reviews in the response
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// GET route to fetch a specific review by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);  // Fetch the review by ID from the database

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json(review);  // Return the specific review in the response
  } catch (err) {
    console.error('Error fetching review:', err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// PUT route to update a review by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, photos, video, checkboxes } = req.body;

    // Validate required fields
    if (!rating || !comment || comment.trim().length < 1 || comment.trim().length > 200) {
      return res.status(400).json({ message: "Rating and a comment between 1 and 200 characters are required." });
    }

    // Find the review by ID and update it with the new data
    const updatedReview = await Review.findByIdAndUpdate(id, { rating, comment, photos, video, checkboxes }, { new: true, runValidators: true });

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found." });
    }

    // Return the updated review in the response
    res.status(200).json(updatedReview);
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// DELETE route to remove a review by ID (Optional)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found." });
    }

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

export default router;
