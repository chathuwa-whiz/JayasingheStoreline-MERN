import express from "express";
const employeeRoutes = express.Router();
import {getAllEmployees, getById, addEmployee, deleteEmployee, updateEmployee} from "../controllers/EmployeeController.js";

employeeRoutes.get("/",getAllEmployees);
employeeRoutes.post("/",addEmployee);
employeeRoutes.get("/:id",getById);
employeeRoutes.put("/:id",updateEmployee);
employeeRoutes.delete("/:id",deleteEmployee);

export default employeeRoutes;