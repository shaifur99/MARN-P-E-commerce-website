// Import cart model to access and delete user's cart items
const addToCartModel = require("../../models/cartProduct")

// Controller to delete a product from the current user's cart
const deleteAddToCartProduct = async (req, res) => {
    try {
        // Get the currently logged-in user's ID (from auth middleware)
        const currentUserId = req.userId 

        // Get the cart item ID to delete from request body
        const addToCartProductId = req.body._id

        // Delete the cart item from database using its ID
        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId })

        // Send success response with info about deleted item
        res.json({
            message: "Product deleted from cart",
            error: false,
            success: true,
            data: deleteProduct
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
module.exports = deleteAddToCartProduct
