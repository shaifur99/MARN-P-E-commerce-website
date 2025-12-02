// Import product model to access product data from the database
const productModel = require("../../models/productModel")

// Controller to get details of a single product by its ID
const getProductDetails = async (req, res) => {
    try {
        // Get the productId from the request body
        const { productId } = req.body

        // Find the product in the database using the productId
        const product = await productModel.findById(productId)

        // Send the product details in the response
        res.json({
            data: product,
            message: "Product details fetched successfully",
            success: true,
            error: false
        })

    } catch (err) {
        // If any error occurs, send error response
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

// Export controller to use in routes
module.exports = getProductDetails
