// Import product model so we can fetch products from the database
const productModel = require("../../models/productModel")

// Controller to filter products based on selected categories
const filterProductController = async (req, res) => {
    try {
        // Get category list from request body (if empty, set to empty array)
        const categoryList = req?.body?.category || []

        // Find all products whose category matches any item in categoryList
        // "$in" means: match if category is inside the provided array
        const product = await productModel.find({
            category: {
                "$in": categoryList
            }
        })

        // Send the filtered product list as response
        res.json({
            data: product,
            message: "Filtered product list",
            error: false,
            success: true
        })

    } catch (err) {
        // If something goes wrong, send error response
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

// Export controller so it can be used in routes
module.exports = filterProductController
