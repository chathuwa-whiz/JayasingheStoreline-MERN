import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);

export default Inquiry;
