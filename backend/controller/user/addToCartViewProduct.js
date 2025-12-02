// Import cart model to fetch user's cart products from database
const addToCartModel = require("../../models/cartProduct")

// Controller to view all products in the current user's cart
const addToCartViewProduct = async (req, res) => {
    try {
        // Get currently logged-in user's ID (from auth middleware)
        const currentUser = req.userId

        // Find all cart items for this user
        // Use populate to get full product details from product collection
        const allProduct = await addToCartModel.find({ userId: currentUser })
            .populate("productId") // populate productId to get complete product info

        // Send success response with all cart products
        res.json({
            data: allProduct,
            success: true,
            error: false
        })

    } catch (err) {
        // If any error occurs, send error response
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

// Export controller to use in routes
module.exports = addToCartViewProduct
