// Import product model to access products from the database
const productModel = require("../../models/productModel")

// Controller to get all products of a specific category
const getCategoryWiseProduct = async (req, res) => {
    try {
        // Get the category from request body or query parameters
        const { category } = req?.body || req?.query

        // Find all products that belong to the specified category
        const product = await productModel.find({ category })

        // Send the found products in the response
        res.json({
            data: product,
            message: "Products in selected category",
            success: true,
            error: false
        })
    } catch (err) {
        // If an error occurs, send error response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

// Export controller to use in routes
module.exports = getCategoryWiseProduct
