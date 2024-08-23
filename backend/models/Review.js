import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true, minlength: 1, maxlength: 200 },
  photos: { type: [String], default: [] },
  video: { type: String, default: null },
  checkboxes: {
    genuineProduct: { type: Boolean, default: false },
    worthForPrice: { type: Boolean, default: false },
    quickResponse: { type: Boolean, default: false },
    sameAsShown: { type: Boolean, default: false },
    recommended: { type: Boolean, default: false },
    fastDelivery: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
