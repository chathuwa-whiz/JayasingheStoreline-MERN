import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  telephoneNo: { type: String, required: true },
  vehicleRegNo: { type: String, required: true },
  vehicleType: { type: String, required: true },
});

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;
