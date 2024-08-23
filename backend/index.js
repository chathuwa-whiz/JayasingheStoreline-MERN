import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register the review routes with the /api/reviews prefix
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
