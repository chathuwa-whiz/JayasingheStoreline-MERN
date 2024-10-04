import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";


const createUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, email, password,NIC, address, age, phone, isAdmin } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  const newUser = new User({ firstname, lastname, username, email, NIC, password, address, age, phone, isAdmin });
  
  try {
    await newUser.save();
    createToken(res, newUser._id);
  } catch (error) {
    res.status(400).json({ message: error.message });
    // throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    // Direct comparison of passwords (insecure)
    if (password === existingUser.password) {
      createToken(res, existingUser._id);

      // res.status(201).json({
      //   _id: existingUser._id,
      //   username: existingUser.username,
      //   email: existingUser.email,
      //   NIC: existingUser.NIC, // Add this line
      //   address: existingUser.address, // Add this line
      //   phone: existingUser.phone, // Add this line
      //   password: existingUser.password,
      //   isAdmin: existingUser.isAdmin,
      // });
      return;
    } else {
      res.status(400).json({ message: 'Invalid password' });
      return;
    }
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httyOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const getCurrentUserProfile = asyncHandler(async(req, res) => {

  const user = await User.findById(req.user.id)

  if(user){

    res.json({

      _id: user._id,
      firstName: user.firstname,
      lastName: user.lastname,
      username: user.username,
      email: user.email,
      NIC: user.NIC, // Add this line
      address: user.address, // Add this line
      phone: user.phone, // Add this line
      password: user.password,
      address: user.address,
      isAdmin: user.isAdmin,
    })
  }
  else{

    res.status(404)
    throw new Error("User not found")
  }
})

const updateCurrentUserProfile = asyncHandler(async(req, res) => {

  const user = await User.findById(req.user._id)

  if(user){

    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.NIC = req.body.NIC || user.NIC; // Add this line
    user.phone = req.body.phone || user.phone; // Add this line
    user.address = req.body.address || user.address; // Add this line
    user.password = req.body.password || user.password

    // if(req.body.password){
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //   user.password = hashedPassword
    // }

    const updateUser = await user.save()

    res.json({

      _id: updateUser._id,
      firstname: updateUser.firstname,
      lastname: updateUser.lastname,
      username: updateUser.username,
      email: updateUser.email,
      NIC: updateUser.NIC, // Add this line
      phone: updateUser.phone, // Add this line
      address: updateUser.address, // Add this line
      password: updateUser.password,
      isAdmin: updateUser.isAdmin
    })
  }
  else{

    res.status(404)
    throw new Error("User not found") 
  }
});

const deleteUserbyId = asyncHandler(async(req, res) => {

  const user = await User.findById(req.params.id)

  if(user){

    if(user.isAdmin){

      res.status(400)
      throw new Error("Admin user cannot be deleted")
    }

    await user.deleteOne({_id: user._id})
    res.json({message: "User deleted successfully"})
  }
  else{

    res.status(404)
    throw new Error("User not found")
  }
})

const getUserById = asyncHandler(async(req, res) => {

  const user = await User.findById(req.params.id).select('-password')

  if(user){

    res.json(user)
  }
  else{
    res.status(400)
    throw new Error("User not found")
  }
})

const updateUserById = asyncHandler(async(req, res) => {

  const user = await User.findById(req.params.id)

  if(user){

    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)

    const updateUser = await user.save()

    res.json({
      _id: updateUser._id,
      username: updateUser.username,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin

    })
  }
  else{
    res.status(400)
    throw new Error("User not found")
  }
})

export {createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserbyId, getUserById, updateUserById};