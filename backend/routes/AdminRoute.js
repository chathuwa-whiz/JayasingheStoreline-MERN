import express from "express";
import { loginAdmin, createAdmin } from "../controllers/AdminController.js"

const router = express.Router();

router.route('/').post(createAdmin);
router.post('/auth', loginAdmin);

export default router;