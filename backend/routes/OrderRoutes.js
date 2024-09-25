import express from "express";
import formidable from "express-formidable";
import { addOrder , fetchOrders,fetchOrderById,updateOrder,deleteOrder } from "../controllers/OrderController.js";

const orderRoutes = express.Router();

// addOrder
orderRoutes.post("/" , formidable() , addOrder);


// fetchOrder
orderRoutes.get("/" , fetchOrders);


// fetchProductById
orderRoutes.get("/:id", fetchOrderById);


// updateOrderDetails
orderRoutes.put("/:id", formidable(), updateOrder);


// removeProduct
orderRoutes.delete("/:id", deleteOrder);

export default orderRoutes;



// fetchAllProducts
// addProductReview
// fetchTopProducts
// fetchNewProducts
// filterProducts

// export default productRoutes;