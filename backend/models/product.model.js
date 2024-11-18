import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    // shows the createdAt and updatedAt fields
    timestamps: true
});

// mongoose pluralizes it for you; you just need to capitalize the first letter and singularize it
// Product is the model, and products is the collection
const Product = mongoose.model('Product', productSchema);

export default Product;