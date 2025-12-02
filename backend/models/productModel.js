const mongoose = require('mongoose')   // Import mongoose to create schema and model

// Schema for product data
const productSchema = mongoose.Schema({

    productName : String,              // Name of the product
    brandName : String,                // Brand of the product
    category : String,                 // Product category (e.g., mobile, laptop)
    productImage : [],                 // List of image URLs
    description : String,              // Product details or information
    price : Number,                    // Original price
    sellingPrice : Number              // Discounted or final selling price

}, {
    timestamps : true                  // Adds createdAt and updatedAt automatically
})

// Create product model for database collection
const productModel = mongoose.model("product", productSchema)

// Export model so it can be used in other files
module.exports = productModel
