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
supplierRoutes.post("/", formidable(), addSupplier);//insert

// Fetch All Suppliers
supplierRoutes.get("/", fetchSuppliers);//display

// Fetch Supplier By ID
supplierRoutes.get("/:id", fetchSupplierById);// 1person details disply

// Update Supplier Details
supplierRoutes.put("/:id", formidable(), updateSupplier);//update

// Remove Supplier
supplierRoutes.delete("/:id", deleteSupplier);

export default supplierRoutes;
