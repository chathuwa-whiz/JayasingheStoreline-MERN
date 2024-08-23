import express from "express";
import formidable from "express-formidable";
import {
    addSupplier,
    deleteSupplier,
    fetchSuppliers,
    fetchSupplierById,
    updateSupplier
} from "../controllers/SupplierController.js";

const supplierRoutes = express.Router();

// Add Supplier
supplierRoutes.post("/", formidable(), addSupplier);

// Fetch All Suppliers
supplierRoutes.get("/", fetchSuppliers);

// Fetch Supplier By ID
supplierRoutes.get("/:id", fetchSupplierById);

// Update Supplier Details
supplierRoutes.put("/:id", formidable(), updateSupplier);

// Remove Supplier
supplierRoutes.delete("/:id", deleteSupplier);

export default supplierRoutes;
