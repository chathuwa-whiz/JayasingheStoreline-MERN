// packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// utiles
import connectDB from "./config/db.js";
import routes from "./routes/ProductRoutes.js"
import userRoutes from "./routes/userRoutes.js"

// load the .env file
dotenv.config();
const port = process.env.PORT || 5000;

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use(cookieParser())

app.use("/api/users", userRoutes)

app.use("/api/products" , routes);

app.listen(port, () => console.log(`server running on port: ${port}`))

console.log("Hello ");
