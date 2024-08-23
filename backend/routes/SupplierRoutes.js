import express from "express";
const SupplierRoutes = express.Router();
import { addsupplier,fetchsupplier} from "../controllers/SupplierController.js";

const supplierRoutes = express.Router();

// addOrder
supplierRoutes.post("/" ,  addsupplier);


// fetchOrder
supplierRoutes.get("/" , fetchsupplier);


export default supplierRoutes;