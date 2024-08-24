import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import reviewRoutes from './routes/reviewRoutes.js';  // Correctly import with ES modules
import inquiryRoutes from './routes/inquiryRoutes.js';  // Adjust path as necessary
import replyRoutes from './routes/replyRoutes.js'; // Adjust the path as needed


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
