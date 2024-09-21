import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  // deliveryItem: { type: String, required: true, default : "" },
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
  // from: { type: String, required: true, default : "" },
  // to: { type: String, required: true, default : "" },
  // driver: { type: String, required: true, default : "" },
  // vehicleType: { type: String, required: true, default : "" },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;
