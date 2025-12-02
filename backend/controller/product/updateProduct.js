// Import permission helper to check if user can update products
const uploadProductPermission = require('../../helpers/permission')

// Import product model to access and update product data in database
const productModel = require('../../models/productModel')

// Controller to update product details
async function updateProductController(req, res) {
    try {
        // Check if the logged-in user has permission to update products
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied")
        }

        // Extract _id from request body and store the rest of fields in resBody
        const { _id, ...resBody } = req.body

        // Find product by _id and update with the provided data
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        // Send the updated product as response
        res.json({
            message: "Product updated successfully",
            data: updateProduct,
            success: true,
            error: false
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
module.exports = updateProductController
