import Review from '../models/Review.js';

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found.' });
    }
    return res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    return res.status(500).json({ message: 'Failed to fetch reviews.', error: err.message });
  }
};

export { getAllReviews };
