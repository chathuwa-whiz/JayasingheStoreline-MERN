import express from 'express';
import { addEmployee, listEmployee, removeEmployee, updateEmployee } from '../controllers/EmployeeController.js';
import multer from "multer"

const employeeRouter = express.Router();

// Image storage
const storage = multer.diskStorage({
    destination: "uploads/employee",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// employeeRouter.post("/add", upload.single("image"), addEmployee);
employeeRouter.post("/add", addEmployee);
employeeRouter.get("/list", listEmployee);
employeeRouter.delete("/remove", removeEmployee);
employeeRouter.put("/update", updateEmployee); // New route for updating employees

export default employeeRouter;
