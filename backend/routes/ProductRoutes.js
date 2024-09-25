import express from "express";
import formidable from "express-formidable";
import multer from 'multer'; // Import multer
const productRoutes = express.Router();

import { addProduct, fetchProducts, fetchProductById, updateProduct, deleteProduct, addProductReview, addProductInquiry, updateReview ,deleteReview, getReviewsByReviewId, replyToInquiry, deleteInquiry, getInquiriesByInquiryId, updateProductStock} from "../controllers/ProductController.js";
// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/reviewRatings'); // Specify the folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Create a unique file name
    }
});

// Initialize upload
const upload = multer({ storage: storage });

import { addProduct, fetchProducts, fetchProductById, updateProduct, deleteProduct, addProductReview, addProductInquiry, updateReview, deleteReview, getReviewsByReviewId, replyToInquiry, deleteInquiry, getInquiriesByInquiryId } from "../controllers/ProductController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMidleware.js";

// addProduct
productRoutes.post("/", formidable(), addProduct);

// fetchProducts
productRoutes.get("/", fetchProducts);

// fetchProductById
productRoutes.get("/:id", fetchProductById);

// updateProductDetails
productRoutes.put("/:id" , formidable(), updateProduct);

// updateProductStock
productRoutes.put("/updatestock/:id" , updateProductStock);
productRoutes.put("/:id", formidable(), updateProduct);

// removeProduct
productRoutes.delete("/:id", deleteProduct);

// addProductReview
productRoutes.post('/:id/reviews', authenticate, upload.single('image'), addProductReview); // This line was kept as is

// AddProductInquiry
productRoutes.post("/:id/inquiries", authenticate, addProductInquiry);

// UpdateProductReview
productRoutes.put("/:productId/:reviewId", authenticate, updateReview);

// DeleteProductReview
productRoutes.delete("/:productId/:reviewId", authenticate, deleteReview);

// DeleteProductInquiry
productRoutes.delete("/:productId/inquiries/:inquiryId", authenticate, deleteInquiry);

// Fetch Reviews by User ID
productRoutes.get("/:productId/:reviewId", authenticate, getReviewsByReviewId);

// Fetch inquiries by ID
productRoutes.get("/:productId/inquiries/:inquiryId", authenticate, getInquiriesByInquiryId);

// Reply to product inquiry
productRoutes.post('/:productId/inquiries/:inquiryId/reply', authenticate, replyToInquiry);

export default productRoutes;
