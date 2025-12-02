// Import product model to access product data from the database
const productModel = require("../../models/productModel")

// Controller to get all products from the database
const getProductController = async (req, res) => {
    try {
        // Fetch all products from database
        // Sort them by newest first using createdAt in descending order (-1)
        const allProduct = await productModel.find().sort({ createdAt: -1 })

        // Send the fetched product list in response
        res.json({
            message: "All Products",
            success: true,
            error: false,
            data: allProduct
        })

    } catch (err) {
        // If any error occurs, send error response with details
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

// Export controller to use in routes
module.exports = getProductController
