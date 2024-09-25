import Admin from '../models/AdminModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import createToken from "../utils/createToken.js";


const createAdmin = asyncHandler(async (req, res) => {
  const { email, password, isAdmin } = req.body;

  // Check for missing inputs
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the inputs." });
  }

  // Check if admin already exists
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ message: "Admin already exists." });
  }

  // Hash the password before saving

  const newAdmin = new Admin({ email, password, isAdmin });

  try {
    await newAdmin.save();
    createToken(res, newAdmin._id);

    res.status(201).json({
      _id: newAdmin._id,
      email: newAdmin.email,
      isAdmin: newAdmin.isAdmin,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const adminUser = await Admin.findOne({ email });

  if (adminUser) {
   
    if (password === adminUser.password) {
      createToken(res, adminUser._id);
      res.status(200).json({
        _id: adminUser._id,
        email: adminUser.email,
        // isAdmin: adminUser.isAdmin,
      });
    } else {
      res.status(400).json({ message: 'Invalid password' });
    }
  } else {
    res.status(404).json({ message: 'Admin not found' });
  }
});

export { loginAdmin, createAdmin };