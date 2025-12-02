// Import cart model to access user's cart data from database
const addToCartModel = require("../../models/cartProduct")

// Controller to count how many products are in the current user's cart
const countAddToCartProduct = async (req, res) => {
    try {
        // Get the currently logged-in user's ID (from auth middleware)
        const userId = req.userId

        // Count all cart items for this user
        const count = await addToCartModel.countDocuments({ userId: userId })

        // Send the count in the response
        res.json({
            data: {
                count: count
            },
            message: "Cart product count fetched successfully",
            error: false,
            success: true
        })
    } catch (error) {
        // If any error occurs, send error response
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

// Export controller to use in routes
module.exports = countAddToCartProduct
