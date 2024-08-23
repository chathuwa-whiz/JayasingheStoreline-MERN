import express from "express";
import formidable from "express-formidable";
import { addOrder , fetchOrders } from "../controllers/OrderController.js";

const orderRoutes = express.Router();

// addOrder
orderRoutes.post("/" , formidable() , addOrder);


// fetchOrder
orderRoutes.get("/" , fetchOrders);


export default orderRoutes;