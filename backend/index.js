// packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// utiles
import connectDB from "./config/db.js";
<<<<<<< HEAD
import routes from "./routes/ProductRoutes.js"
import userRoutes from "./routes/userRoutes.js"
=======
import productRoutes from "./routes/ProductRoutes.js";
>>>>>>> e0c9caadfa00ce6de2fe9105848bec4c410dcdc4

// load the .env file
dotenv.config();
const port = process.env.PORT || 5000;

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use(cookieParser())

<<<<<<< HEAD
app.use("/api/users", userRoutes)

app.use("/api/products" , routes);
=======
app.use("/api/products" , productRoutes);

>>>>>>> e0c9caadfa00ce6de2fe9105848bec4c410dcdc4

app.listen(port, () => console.log(`server running on port: ${port}`))

console.log("Hello ");
