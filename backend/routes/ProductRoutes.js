import express from "express";
import formidable from "express-formidable";
const productRoutes = express.Router();

import { addProduct, fetchProducts, fetchProductById, updateProduct, deleteProduct, addProductReview, addProductInquiry, updateReview ,deleteReview, getReviewsByReviewId, replyToInquiry, deleteInquiry, getInquiriesByInquiryId} from "../controllers/ProductController.js";
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

// AddProductInquiry
productRoutes.post("/:id/inquiries", authenticate, addProductInquiry);

// UpdateProductReview
productRoutes.put("/:productId/:reviewId", authenticate, updateReview);

// DeleteProductReview
productRoutes.delete("/:productId/:reviewId", authenticate, deleteReview);

// Delete product inquiry
productRoutes.delete("/:productId/:inquiryId", authenticate, deleteInquiry);

// Fetch Reviews by User ID
productRoutes.get("/:productId/:reviewId", authenticate, getReviewsByReviewId);

// Fetch inquiries by  ID
productRoutes.get("/:productId/:inquiryId", authenticate, getInquiriesByInquiryId);

// Reply to product inquiry
productRoutes.post('/:id/inquiries/:inquiryId/reply', authenticate, replyToInquiry);


// removeReview
//productRoutes.delete("/:id/:reviewId" , authenticate, deleteReview);


export default productRoutes;
