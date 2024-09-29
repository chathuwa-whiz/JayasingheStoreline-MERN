import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    default: function () {
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString().slice(-2); // Get last two digits of the year
      const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Ensure two-digit month
      const day = ('0' + currentDate.getDate()).slice(-2); // Ensure two-digit day
      const randomNum = Math.floor(Math.random() * 100); // Random number between 0-99 for uniqueness
      return `DEL${year}${month}${day}${randomNum}`; // Example: DEL24092645
    },
  },
  deliveryItem: { type: String, required: true, default : "" },
  itemsPrice: { type: Number, required: true, default: 0 },
  deliveryPrice: { type: Number, required: true, default: 0 },
  totalPrice: { type: Number, required: true, default: 0 },
  firstName: { type: String, required: true, default: "" },
  lastName: { type: String, required: true, default: "" },
  telephoneNo: { type: String, required: true, default: "" },
  address: { type: String, required: true, default: "" },
  city: { type: String, required: true, default: "" },
  province: { type: String, required: true, default: "" },
  postalCode: { type: String, required: true, default: "" },
  deliveryStatus: { type: String, required: true, default: "" },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;
