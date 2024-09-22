import express from "express";
import formidable from "express-formidable";
const productRoutes = express.Router();

import { addProduct, fetchProducts, fetchProductById, updateProduct, deleteProduct, addProductReview, addProductInquiry, updateReview ,getReviewsByReviewId, replyToInquiry} from "../controllers/ProductController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMidleware.js";

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
productRoutes.route("/:id").post(authenticate, addProductReview);

// Add a product inquiry
productRoutes.post("/:id/inquiries", authenticate, addProductInquiry);

// Update product review
productRoutes.put("/:productId/:reviewId", authenticate, updateReview);

// Fetch Reviews by User ID
productRoutes.get("/:productId/:reviewId", authenticate, getReviewsByReviewId);

// Reply to product inquiry
productRoutes.post('/:id/inquiries/:inquiryId/reply', authenticate, replyToInquiry);


// removeReview
//productRoutes.delete("/:id/:reviewId" , authenticate, deleteReview);


export default productRoutes;
