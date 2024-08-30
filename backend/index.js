import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import crypto from 'crypto'; // Import crypto for handling signatures
import path from "path";
import cors from 'cors';
import connectDB from './config/db.js';

// Import routes
import connectDB from "./config/db.js";
// utiles
import productRoutes from "./routes/ProductRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import uploadRoutes from './routes/UploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import deliveryRoutes from './routes/DeliveryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';
import payhereRoutes from './routes/payhere.js'; // Import PayHere route

// Load the .env file
dotenv.config();
const port = process.env.PORT || 4000;

// Connect to the database
connectDB();
connectDB();

const app = express();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define routes
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payhere", payhereRoutes); // Use PayHere route

const __dirname = path.resolve();
app.use("/uploads/products", express.static(path.join(__dirname, '/uploads/products')));

app.listen(port, () => console.log(`Server running on port: ${port}`));

app.listen(port, () => console.log(`server running on port: ${port}`));