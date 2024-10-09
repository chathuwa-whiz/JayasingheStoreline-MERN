import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserbyId,
  getUserById,
  updateUserById,
  forgotPassword,
  resetPassword
} from "../controllers/userControllers.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMidleware.js";

const router = express.Router();

router.route('/').post(createUser).get(getAllUsers);
router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser);

router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate, updateCurrentUserProfile);

//Admin routes
router.route('/:id').delete(deleteUserbyId).get(authenticate, authorizeAdmin, getUserById).put(authenticate, authorizeAdmin, updateUserById);

// Password reset routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;