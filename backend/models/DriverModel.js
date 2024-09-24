import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nic: { type: String, required: true },
  birthday: { type: Date, required: true },
  telephoneNo: { type: String, required: true },
  vehicleRegNo: { type: String, required: true },
  vehicleType: { type: String, required: true },
  driverLicenceNo: { type: String, required: true },
});

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;
