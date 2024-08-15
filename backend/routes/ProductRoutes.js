import express from "express";
const productRoutes = express.Router();

import { addProduct, fetchProducts, fetchProductById, updateProduct, deleteProduct } from "../controllers/ProductController.js"; 

// addProduct
productRoutes.post("/" , addProduct);

// fetchProducts
productRoutes.get("/" , fetchProducts);

// fetchProductById
productRoutes.get("/:id" , fetchProductById);

// updateProductDetails
productRoutes.put("/:id" , updateProduct);

// removeProduct
productRoutes.delete("/:id" , deleteProduct);


// fetchAllProducts
// addProductReview
// fetchTopProducts
// fetchNewProducts
// filterProducts

export default productRoutes;