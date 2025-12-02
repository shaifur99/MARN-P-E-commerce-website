// Import product model to access product data from database
const productModel = require("../../models/productModel")

// Controller to get one product from each available category
const getCategoryProduct = async (req, res) => {
    try {
        // Get all unique product categories from database
        const productCategory = await productModel.distinct("category")

        console.log("category", productCategory) // For debugging: show all categories

        // Array to store one product from each category
        const productByCategory = []

        // Loop through each category
        for (const category of productCategory) {
            // Find only one product from the current category
            const product = await productModel.findOne({ category })

            // If product exists, add it to the array
            if (product) {
                productByCategory.push(product)
            }
        }

        // Send the array of products (one per category) in the response
        res.json({
            message: "Category products",
            data: productByCategory,
            success: true,
            error: false
        })

    } catch (err) {
        // If any error occurs, send error response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

// Export the controller to use in routes
module.exports = getCategoryProduct
