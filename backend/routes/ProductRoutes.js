import express from "express";
const router = express.Router();

import Product from "../models/ProductModel.js";

// addProduct
router.post("/" , (req, res) => {
    Product.create(req.body)
        .then( () => res.json( { msg : "Product Added Successfully" } ) )
        .catch( () => res.status(400).json( { msg : "Product Adding Failed" } ) )
});

// fetchProducts
router.get("/" , (req, res) => {
    Product.find()
        .then( (products) => res.json(products) )
        .catch( () => res.status(400).json( { msg : "No Product Found" } ) )
});

// fetchProductById
router.get("/:id" , (req, res) => {
    Product.findById(req.params.id)
        .then( (product) => res.json(product) )
        .catch( () => res.status(400).json( { msg : "Can not find this product" } ) )
});

// updateProductDetails
router.put("/:id" , (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
        .then( () => res.json( { msg : "Update Successful" } ) )
        .catch( () => res.status(400).json( { msg : "Update Failed" } ) )
});

// removeProduct
router.delete("/:id" , (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then( () => res.json( { msg : "Product Deleted Successfully" } ) )
        .catch( () => res.status(400).json( { msg : "Can not be Delete" } ) )
});


// fetchAllProducts
// addProductReview
// fetchTopProducts
// fetchNewProducts
// filterProducts

export default router;