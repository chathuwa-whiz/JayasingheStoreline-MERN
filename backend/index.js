import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import crypto from 'crypto'; // Import crypto for handling signatures

// Utils
import connectDB from "./config/db.js";
import productRoutes from "./routes/ProductRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import uploadRoutes from './routes/UploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';

// Load the .env file
dotenv.config();
const port = process.env.PORT || 5000;
const SECRET_KEY = process.env.PAYHERE_SECRET_KEY; 

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

const __dirname = path.resolve();
app.use("/uploads/products", express.static(path.join(__dirname + '/uploads/products')));

// PayHere notification handling
app.post('/payhere/notify', (req, res) => {
  const { signature, ...payload } = req.body;

  // Compute the signature using your secret key
  const computedSignature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(JSON.stringify(payload))
    .digest('hex');

  // Verify the signature
  if (computedSignature === signature) {
    console.log('Payment verified:', payload);
    res.sendStatus(200);
  } else {
    console.log('Invalid signature');
    res.sendStatus(400);
  }
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
