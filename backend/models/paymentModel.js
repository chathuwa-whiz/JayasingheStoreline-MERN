import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: function() { return this.paymentMethod === 'card'; },
    match: [/^\d{4}-?\d{4}-?\d{4}-?\d{4}$/, 'Invalid card number format'],
    validate: {
      validator: function(value) {
        // Allow up to 16 digits with optional hyphens, but disallow any other characters
        return /^[\d\-]{12,19}$/.test(value);
      },
      message: 'Card number must be up to 16 digits with optional hyphens'
    }
  },
  cardName: {
    type: String,
    required: function() { return this.paymentMethod === 'card'; },
    match: [/^[a-zA-Z\s]+$/, 'Card name must only contain letters and spaces']
  },
  expirationDate: {
    type: String,
    required: function() { return this.paymentMethod === 'card'; },
    match: [/^\d{2}\/\d{2}$/, 'Invalid expiration date format']
  },
  cvv: {
    type: String,
    required: function() { return this.paymentMethod === 'card'; },
    match: [/^\d{3,4}$/, 'CVV must be 3 or 4 digits']
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cod'],
    required: true
  }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
