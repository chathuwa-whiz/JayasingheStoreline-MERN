import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200,
  },
  photos: {
    type: [String],  // Array of image URLs or base64 encoded strings
    default: [],
  },
  video: {
    type: String,  // URL or base64 encoded video string
    default: null,
  },
  checkboxes: {
    genuineProduct: { type: Boolean, default: false },
    worthForPrice: { type: Boolean, default: false },
    quickResponse: { type: Boolean, default: false },
    sameAsShown: { type: Boolean, default: false },
    recommended: { type: Boolean, default: false },
    fastDelivery: { type: Boolean, default: false },
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
