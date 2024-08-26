import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  inquiryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inquiry', required: true },
  replyText: { type: String, required: true }
}, { timestamps: true }); // This will automatically add `createdAt` and `updatedAt` fields

export default mongoose.model('Reply', replySchema);
