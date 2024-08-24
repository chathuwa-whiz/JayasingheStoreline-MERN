import mongoose from 'mongoose';

// Define the schema for a Reply
const replySchema = new mongoose.Schema({
  inquiryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inquiry', // Reference to the Inquiry model
    required: true
  },
  replyText: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 500 // Adjust the maximum length as needed
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Reply model
const Reply = mongoose.model('Reply', replySchema);

export default Reply;
