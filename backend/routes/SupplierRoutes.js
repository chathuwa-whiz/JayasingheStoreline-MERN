import express from "express";
import formidable from "express-formidable";
import { addSupplier, fetchSuppliers } from "../controllers/SupplierController.js";

const supplierRoutes = express.Router();

// addOrder
supplierRoutes.post("/", formidable(), addSupplier);

// fetchOrder
supplierRoutes.get("/", fetchSuppliers);

export default supplierRoutes;