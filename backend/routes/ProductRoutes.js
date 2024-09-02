import express from "express";
import formidable from "express-formidable";
const productRoutes = express.Router();

import { addProduct, fetchProducts, fetchProductById, updateProduct, deleteProduct, addProductReview, updateProductStock } from "../controllers/ProductController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMidleware.js";

// addProduct
productRoutes.post("/" , formidable(), addProduct);

// fetchProducts
productRoutes.get("/" , fetchProducts);

// fetchProductById
productRoutes.get("/:id" , fetchProductById);

// updateProductDetails
productRoutes.put("/:id" , formidable(), updateProduct);

// updateProductStock
productRoutes.put("/updatestock/:id" , updateProductStock);

// removeProduct
productRoutes.delete("/:id" , deleteProduct);

// addProductReview
productRoutes.route("/:id").post(authenticate, addProductReview);



// fetchAllProducts
// addProductReview
// fetchTopProducts
// fetchNewProducts
// filterProducts

export default productRoutes;
