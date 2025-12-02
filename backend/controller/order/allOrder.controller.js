// Import the Order model to fetch all order-related data from the database
const orderModel = require("../../models/orderProductModel")

// Import the User model to check the role of the logged-in user
const userModel = require("../../models/userModel")

// Controller to get all orders (Only Admin can access)
const allOrderController = async (request, response) => {
    // Get the currently logged-in user ID (set earlier by auth middleware)
    const userId = request.userId

    // Find the user in the database using the userId
    const user = await userModel.findById(userId)

    // Check if the logged-in user is NOT an Admin
    if (user.role !== 'ADMIN') {
        // If not admin, deny access
        return response.status(500).json({
            message: "Not authorized to access this resource"
        })
    }

    // If admin, fetch all orders and sort them by newest first (descending order)
    const AllOrder = await orderModel.find().sort({ createdAt: -1 })

    // Send all orders in the response
    return response.status(200).json({
        data: AllOrder,
        success: true
    })
}

// Export the controller so it can be used in the routes
module.exports = allOrderController
