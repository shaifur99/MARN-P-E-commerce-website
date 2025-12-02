const mongoose = require('mongoose')   // Import mongoose for creating schema and model

// Create schema for Add to Cart
const addToCart = mongoose.Schema({

   productId : {                       // Product ID of the item user added
        ref : 'product',               // It is connected to "product" collection
        type : String,                 // Product ID will be stored as string
   },

   quantity : Number,                  // How many items the user added

   userId : String,                    // ID of the user who added the product

}, {
    timestamps : true                  // Auto add createdAt and updatedAt fields
})

// Create model for Add to Cart collection
const addToCartModel = mongoose.model("addToCart", addToCart)

// Export model to use in other files
module.exports = addToCartModel
