import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
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
  cardExpiry: {
    type: String,
    required: function() { return this.paymentMethod === 'card'; },
    match: [/^\d{2}\/\d{2}$/, 'Invalid expiration date format']
  },
  cardCVV: {
    type: String,
    required: function() { return this.paymentMethod === 'card'; },
    match: [/^\d{3,4}$/, 'CVV must be 3 or 4 digits']
  },
  bankAccount: {
    type: String,
    required: function() { return this.paymentMethod === 'bank'; }
  },
  paymentDetails: {
    type: String,
    required: function() { return this.paymentMethod === 'bank'; },
    match: [/^[a-zA-Z0-9\s]+$/, 'Payment details must contain letters, numbers, and spaces']
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cod', 'bank'],
    required: true
  },
  orderId: {
    type: String,
    required: function() { return this.paymentMethod === 'cod'; } // Make orderId required for COD
  }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
