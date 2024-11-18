import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

// Load environment variables from .env file, and loads them into process.env, which is za global object in Node.js
dotenv.config()

const app = express();

// Middleware that allows us to accept json data in the req.body
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Server is ready");
// })

app.post("/api/products", async (req, res) => {
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ 
            success: false,
            message: "Name, price, and image are required"
        });
    }

    // Product is an object which is the data model
    const newProduct = new Product(product);

    try {
        // .save() saves it into the database
        // this returns a value; we can also assign it to a variable
        // that's why we can call it in the data field as a value
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct
        })
    } catch (error) {
        console.error("Error in Create product:", error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


})

app.delete("/api/products/:id", async (req, res) => {
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {

    }
})

// Shows the value of the mongodb URI in environment variables
// console.log(process.env.MONGO_URI);

app.listen(9000, () => {
    connectDB();
    console.log('Server is running on port 9000');
});

