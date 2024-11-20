import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        // .find() returns all the products
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in Fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const postProducts = async (req, res) => {
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
}

export const putProducts = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    // Check if the id is a valid mongodb id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product id"});
    }

    // Allowed fields
    const allowedFields = ['name', 'price', 'image'];
    const receivedFields = Object.keys(product);

    // Check for unexpected fields
    const hasUnexpectedFields = receivedFields.some(field => !allowedFields.includes(field));

    if (hasUnexpectedFields) {
        return res.status(400).json({ 
            success: false,
            message: "Only name, price, and image fields are allowed"
        });
    }

    if (!product.name && !product.price && !product.image) {
        return res.status(400).json({ 
            success: false,
            message: "Updating at least name, price, or image is required"
        });
    }

    try {
        // new: true returns the updated product
        // without it, it returns the product before it was updated
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteProducts = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log("Error in Deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}