import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import reviewRoutes from './routes/reviewRoutes.js';  // Correctly import with ES modules
import inquiryRoutes from './routes/inquiryRoutes.js';  // Adjust path as necessary
import replyRoutes from './routes/replyRoutes.js'; // Adjust the path as needed
import path from "path";
import cors from 'cors';

// utiles
import connectDB from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import uploadRoutes from './routes/UploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import deliveryRoutes from './routes/DeliveryRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';
import driverRoutes from './routes/DriverRoutes.js'; // Import driver routes

dotenv.config();
const port = process.env.PORT || 4000;

connectDB();

const app = express();

// Middleware
app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/reviewRoutes', reviewRoutes);  // Ensure this matches the frontend URL
app.use('/api/inquiryRoutes', inquiryRoutes);
app.use('/api/replyRoutes', replyRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors()) // Make sure cors is enabled

app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/drivers", driverRoutes); // Use driver routes

const __dirname = path.resolve();
app.use("/uploads/products", express.static(path.join(__dirname + '/uploads/products')));

app.listen(port, () => console.log(`server running on port: ${port}`));
