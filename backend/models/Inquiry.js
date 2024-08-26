import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  message: { type: String, required: true },
  replies: [
    {
      replyText: { type: String, required: true }, // Ensure replyText is required
      replyDate: { type: Date, default: Date.now },
      managerId: { type: mongoose.Schema.Types.ObjectId, default: null } // Optional: Default value
    }
  ]
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
