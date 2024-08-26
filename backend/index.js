import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from "path";
import cors from 'cors';

// utiles
import connectDB from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import uploadRoutes from './routes/UploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import deliveryRoutes from './routes/DeliveryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';
import driverRoutes from './routes/DriverRoutes.js'; // Import driver routes

// load the .env file
dotenv.config();
const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors()) // Make sure cors is enabled

app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/drivers", driverRoutes); // Use driver routes
app.use('/api/reviewRoutes', reviewRoutes);  // Ensure this matches the frontend URL
app.use('/api/inquiryRoutes', inquiryRoutes);
app.use('/api/replyRoutes', replyRoutes);

const __dirname = path.resolve();
app.use("/uploads/products", express.static(path.join(__dirname + '/uploads/products')));

app.listen(port, () => console.log(`server running on port: ${port}`));
