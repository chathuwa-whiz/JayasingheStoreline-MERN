import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import crypto from 'crypto'; // Import crypto for handling signatures
import cors from 'cors';
import connectDB from './config/db.js';

// utiles
import productRoutes from "./routes/ProductRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import uploadRoutes from './routes/UploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import deliveryRoutes from './routes/DeliveryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';
import driverRoutes from './routes/DriverRoutes.js'; // Import driver routes
import employeeRouter from './routes/EmployeeRoutes.js';
import authEmployeeRouter from './routes/AuthEmployeeRoutes.js';
import supplierRoutes from './routes/SupplierRoutes.js';
import supplierUploadRoutes from './routes/SupplierUploadRoutes.js';
import payhereRoutes from './routes/payhere.js'; // Import PayHere route

// Load the .env file
dotenv.config();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors()) // Make sure cors is enabled

// Define routes
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/supplierupload", supplierUploadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/drivers", driverRoutes); // Use driver routes
app.use("/api/payhere", payhereRoutes); // Use PayHere route
app.use("/api/employee",employeeRouter);
app.use("/api/authEmployee",authEmployeeRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});

const __dirname = path.resolve();
app.use("/uploads/products", express.static(path.join(__dirname + '/uploads/products')));
app.use("/uploads/supplierupload", express.static(path.join(__dirname + '/uploads/supplierupload')));

app.listen(port, () => console.log(`server running on port: ${port}`));