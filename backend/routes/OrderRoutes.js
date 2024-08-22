import express from "express";
import { addOrder,fetchOrders} from "../controllers/OrderController.js";

const orderRoutes = express.Router();

// addOrder
productRoutes.post("/" ,  addOrder);


// fetchOrder
productRoutes.get("/" , fetchOrders);


export default orderRoutes;