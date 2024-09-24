import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true, default: '' },
  nic: { type: String, required: true, default: '' },
  birthday: { type: Date, required: true },
  telephoneNo: { type: String, required: true, default: '' },
  vehicleRegNo: { type: String, required: true, default: '' },
  vehicleType: { type: String, required: true, default: '' },
  driverLicenceNo: { type: String, required: true, default: '' },
});

const Driver = mongoose.model('Driver', driverSchema);

export default Driver;
