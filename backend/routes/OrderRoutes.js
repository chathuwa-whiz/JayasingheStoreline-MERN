import express from "express";
import { addOrder,fetchOrders} from "../controllers/OrderController.js";

const orderRoutes = express.Router();

// addOrder
orderRoutes.post("/" ,  addOrder);


// fetchOrder
orderRoutes.get("/" , fetchOrders);


export default orderRoutes;