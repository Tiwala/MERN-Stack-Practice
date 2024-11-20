import express from 'express';
import dotenv from 'dotenv';
// needed for dirname
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js"


// Load environment variables from .env file, and loads them into process.env, which is za global object in Node.js
dotenv.config()

const app = express();
const PORT = process.env.PORT

// __dirname is the directory name of the current module
// path.resolve() resolves an absolute path
// This is needed to serve static files in the frontend
// Needed for deployment
const __dirname = path.resolve();

// Middleware that allows us to accept json data in the req.body
app.use(express.json());

// Makes it such that this is the prefix for all routes in productRoutes
app.use("/api/products", productRoutes);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    // '*' is a wildcard, meaning that any route that is not defined in the backend will be redirected to the frontend
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

// Shows the value of the mongodb URI in environment variables
// console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
    // from db.js, establishes a connetion to my MongoDB database when the server starts
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});

