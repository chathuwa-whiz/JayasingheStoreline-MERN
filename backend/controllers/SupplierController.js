import Supplier from "../models/SupplierModel.js";

// Add new supplier
export const addSupplier = async (req, res) => {
    try {
        const { name, image, phone, email, gender, type } = req.fields;

        switch (true) {
            case !name:
                return res.json({ error: "Name is required" });
            case !image:
                return res.json({ error: "Image is required" });
            case !phone:
                return res.json({ error: "Phone is required" });
            case !email:
                return res.json({ error: "Email is required" });
            case !gender:
                return res.json({ error: "Gender is required" });
            case !type:
                return res.json({ error: "Type is required" });
        }

        const supplier = new Supplier({ ...req.fields });
        await supplier.save();
        res.status(201).json({ msg: "Supplier added successfully" });
    } catch (error) {
        res.status(400).json({ msg: "Supplier adding failed", error });
    }
}

// Fetch all suppliers
export const fetchSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(400).json({ msg: "No suppliers found", error });
    }
}

// Fetch supplier by ID
export const fetchSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }
        res.json(supplier);
    } catch (error) {
        res.status(400).json({ msg: "Error fetching supplier", error });
    }
}

// Update supplier
export const updateSupplier = async (req, res) => {
try {
        const { name, image, phone, email, gender, type } = req.fields;
        
        switch(true) {
            case !name:
                return res.json( { error: "Name is required" } );
            case !image:
                return res.json( { error: "Image is required" } );
            case !phone:
                return res.json( { error: "Phone is required" } );
            case !email:
                return res.json( { error: "Email is required" } );
            case !gender:
                return res.json( { error: "Gender is required" } );
            case !type:
                return res.json( { error: "Type is required" } );
        }
        
        const supplier = await Supplier.findByIdAndUpdate(req.params.id, {...req.fields}, { new : true });
        if(!supplier) {
            return res.status(400).json( { msg : "Product not found" } )
        }
        await supplier.save();
        res.json( { msg : "Update Successful ", supplier } );
    } catch (error) {
        res.status(400).json( { msg : "Update Failed ", error } );
    }}
    // Delete supplier
export const deleteSupplier = async (req, res) => {
    try {const supplier = await Supplier.findByIdAndDelete(req,params.id);
        if (!supplier) {
            return res.status(404).json({ error: "Supplier not found" });}
        res.json({ msg: "Supplier deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: "Supplier deletion failed", error });
    }
}