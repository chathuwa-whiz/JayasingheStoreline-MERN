import Delivery from '../models/DeliveryModel.js';

export const addDelivery = async (req, res) => {
  try {
    const newDelivery = new Delivery({...req.fields});
    await newDelivery.save();
    res.status(201).json({ message: 'Delivery added successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json(deliveries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDelivery = await Delivery.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedDelivery);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    await Delivery.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
