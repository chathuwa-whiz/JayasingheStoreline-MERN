import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import crypto from 'crypto'; // Import crypto for handling signatures
import cors from 'cors';
import connectDB from './config/db.js';
import multer from 'multer'; // Import multer

// utiles
import productRoutes from "./routes/ProductRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import uploadRoutes from './routes/UploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import deliveryRoutes from './routes/DeliveryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';
import payhereRoutes from './routes/payhere.js'; // Import PayHere route
import adminRoutes from './routes/AdminRoute.js';

import driverRoutes from './routes/DriverRoutes.js'; // Import driver routes
import employeeRouter from './routes/EmployeeRoutes.js';
import authEmployeeRouter from './routes/AuthEmployeeRoutes.js';
import supplierRoutes from './routes/SupplierRoutes.js';
import supplierUploadRoutes from './routes/SupplierUploadRoutes.js';
import payhereRoutes from './routes/payhere.js'; // Import PayHere route
import addEmployeeRouter from './routes/addEmployeeRoute.js';

// Load the .env file
dotenv.config();
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors()) 

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/reviewRatings'); // Save files to the uploads/reviewRatings folder
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Create unique file names
    }
});

// Initialize upload
const upload = multer({ storage: storage });

// Define routes
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/supplierupload", supplierUploadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/payhere", payhereRoutes); // Use PayHere route
app.use("/api/supplier", supplierRoutes);
app.use("/api/drivers", driverRoutes); // Use driver routes
app.use("/api/payhere", payhereRoutes); // Use PayHere route
app.use("/api/employee",employeeRouter);
app.use("/api/authEmployee",authEmployeeRouter);
app.use("/api/addEmployee",addEmployeeRouter);

// Route for file upload
app.post('/api/reviewRatings/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    return res.status(200).json({ success: true, filePath: `/uploads/reviewRatings/${req.file.filename}` });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});



// Static file serving
const __dirname = path.resolve();
app.use("/uploads/products", express.static(path.join(__dirname, '/uploads/products')));
app.use("/uploads/products", express.static(path.join(__dirname + '/uploads/products')));
app.use("/uploads/supplierupload", express.static(path.join(__dirname + '/uploads/supplierupload')));
app.use("/uploads/reviewRatings", express.static(path.join(__dirname + '/uploads/reviewRatings'))); // reviewRatings uploads

app.listen(port, () => console.log(`Server running on port: ${port}`));
