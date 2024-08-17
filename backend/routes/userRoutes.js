import express from "express";
import { createUser, loginUser, logoutCurrentUser } from "../controllers/userControllers.js";
// import { authenticate, authorizeAdmin } from "../middlewares/authMidleware.js";



const router = express.Router()

router.route("/").post(createUser)
// .get(authenticate, authorizeAdmin, getAllUsers);
router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser)

export default router;