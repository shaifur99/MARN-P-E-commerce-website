// Import permission helper to check if user can upload products
const uploadProductPermission = require("../../helpers/permission")

// Import product model to save new product data in database
const productModel = require("../../models/productModel")

// Controller to upload a new product
async function UploadProductController(req, res) {
    try {
        // Get the logged-in user's ID from request (usually set in auth middleware)
        const sessionUserId = req.userId

        // Check if this user has permission to upload products
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied")
        }

        // Create a new product instance using request body
        const uploadProduct = new productModel(req.body)

        // Save the new product to the database
        const saveProduct = await uploadProduct.save()

        // Send success response with saved product data
        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct
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
module.exports = UploadProductController
