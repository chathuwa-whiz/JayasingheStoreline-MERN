import supplier from "../models/SupplierModel.js";

// add new supplier
export const addSupplier = async (req, res) => {
    try {
        const { name, image, phone, Date, Gender, sid, Type } = req.fields;
        
        switch(true) {
            case !name:
                return res.json( { error: "Name is required" } );
            case !image:
                    return res.json( { error: "image is required" } );
            case !phone:
                return res.json( { error: "phone is required" } );
            case !Date:
                return res.json( { error: "Category is required" } );
            case !Gender:
                return res.json( { error: "SKU is required" } );
            case !sid:
                return res.json( { error: "Barcode is required" } );
            case !Type:
                    return res.json( { error: "Barcode is required" } );
        }
         
        const supplier= new supplier({...req.fields});
        await supplier.save();
        res.status(201).json( { msg : "Supplier Added Successfully" } );
    } catch (error) {
        res.status(400).json( { msg : " Supplier Adding Failed ", error } );
    }
}

// fetch all supplier
export const fetchsupplier = async (req, res) => {
    try {
        const supplier = await supplier.find();
        res.json(supplier);
    } catch (error) {
        res.status(400).json( { msg : "No supplier Found", error } );
    }
}

