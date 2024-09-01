import express from 'express';
import {addEmployee} from '../controllers/addEmployeeController.js';

const router = express.Router();

router.post('/create',addEmployee);

export default router;
