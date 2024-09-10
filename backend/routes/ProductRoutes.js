import express from "express";
import formidable from "express-formidable";
const productRoutes = express.Router();

import { addProduct, fetchProducts, fetchProductById, updateProduct, deleteProduct, addProductReview, addProductInquiry, updateReview ,getReviewsByUserId, replyToInquiry} from "../controllers/ProductController.js";
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

// Add a product inquiry
productRoutes.post("/:id/inquiries", authenticate, addProductInquiry);

// Update product review
productRoutes.put("/:id/:reviewId", authenticate, updateReview);

// Fetch Reviews by User ID
productRoutes.get("/reviews/user/:userId", authenticate, getReviewsByUserId);

// Reply to product inquiry
productRoutes.post('/:id/inquiries/:inquiryId/reply', authenticate, replyToInquiry);


// removeReview
//productRoutes.delete("/:id/:reviewId" , authenticate, deleteReview);


export default productRoutes;
