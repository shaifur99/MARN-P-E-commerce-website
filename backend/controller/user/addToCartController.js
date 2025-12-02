// Import cart model to add products to user's cart in database
const addToCartModel = require("../../models/cartProduct")

// Controller to add a product to the current user's cart
const addToCartController = async (req, res) => {
    try {
        // Get productId from request body
        const { productId } = req?.body

        // Get currently logged-in user's ID (from auth middleware)
        const currentUser = req.userId

        // Check if the product is already in the user's cart
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser })
        console.log("isProductAvailable:", isProductAvailable) // For debugging

        // If product already exists in cart, return error response
        if (isProductAvailable) {
            return res.json({
                message: "Already exists in cart",
                success: false,
                error: true
            })
        }

        // Prepare payload to add product to cart
        const payload = {
            productId: productId,
            quantity: 1, // default quantity = 1
            userId: currentUser,
        }

        // Create a new cart entry
        const newAddToCart = new addToCartModel(payload)

        // Save the new cart item in the database
        const saveProduct = await newAddToCart.save()

        // Send success response with the saved cart item
        return res.json({
            data: saveProduct,
            message: "Product added to cart",
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
module.exports = addToCartController
