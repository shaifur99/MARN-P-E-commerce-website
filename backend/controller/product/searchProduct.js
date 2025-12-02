// Import product model to access product data from the database
const productModel = require("../../models/productModel")

// Controller to search products by name or category
const searchProduct = async (req, res) => {
    try {
        // Get the search query from request query parameters
        const query = req.query.q

        // Create a case-insensitive regex to search in productName and category
        const regex = new RegExp(query, 'i', 'g')

        // Find products where productName or category matches the regex
        const product = await productModel.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        })

        // Send the search results as response
        res.json({
            data: product,
            message: "Search product list",
            error: false,
            success: true
        })
    } catch (err) {
        // If an error occurs, send error response
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

// Export controller to use in routes
module.exports = searchProduct
