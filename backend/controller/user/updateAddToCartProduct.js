// Import cart model to access and update user's cart items
const addToCartModel = require("../../models/cartProduct")

// Controller to update quantity of a product in the current user's cart
const updateAddToCartProduct = async (req, res) => {
    try {
        // Get the currently logged-in user's ID (from auth middleware)
        const currentUserId = req.userId 

        // Get the cart item ID from request body
        const addToCartProductId = req?.body?._id

        // Get the new quantity from request body
        const qty = req.body.quantity

        // Update the cart item quantity in database
        // Only update if qty is provided
        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId },
            { ...(qty && { quantity: qty }) }
        )

        // Send success response with updated info
        res.json({
            message: "Product updated in cart",
            data: updateProduct,
            error: false,
            success: true
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
module.exports = updateAddToCartProduct
