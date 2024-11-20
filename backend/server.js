import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js"


// Load environment variables from .env file, and loads them into process.env, which is za global object in Node.js
dotenv.config()

const app = express();
const PORT = process.env.PORT

// Middleware that allows us to accept json data in the req.body
app.use(express.json());

// Makes it such that this is the prefix for all routes in productRoutes
app.use("/api/products", productRoutes);


// Shows the value of the mongodb URI in environment variables
// console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
    // from db.js, establishes a connetion to my MongoDB database when the server starts
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

