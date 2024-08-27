import express from "express";
import formidable from "express-formidable";
const productRoutes = express.Router();

import { addProduct, fetchProducts, fetchProductById, updateProduct, deleteProduct, addProductReview } from "../controllers/ProductController.js";

// addProduct
productRoutes.post("/" , formidable(), addProduct);

// fetchProducts
productRoutes.get("/" , fetchProducts);

// fetchProductById
productRoutes.get("/:id" , fetchProductById);

// updateProductDetails
productRoutes.put("/:id" , formidable(), updateProduct);

// removeProduct
productRoutes.delete("/:id" , deleteProduct);

// addProductReview
productRoutes.post("/:id/reviews", addProductReview);


// fetchAllProducts
// addProductReview
// fetchTopProducts
// fetchNewProducts
// filterProducts

export default productRoutes;