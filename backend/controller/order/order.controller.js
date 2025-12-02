const orderProductModel = require("../../models/orderProductModel");

// Controller to get all orders of the currently logged-in user
const orderController = async (request, response) => {
    try {
        const currentUserId = request.userId;

        const orderList = await orderProductModel
            .find({ userId: currentUserId })
            .sort({ createdAt: -1 });

        response.json({
            data: orderList,
            message: "Order list",
            success: true
        });

    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

// Get all orders for admin
const allOrderController = async (request, response) => {
    try {
        const orders = await orderProductModel
            .find({})
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        response.json({
            data: orders,
            message: "All orders",
            success: true
        });

    } catch (error) {
        response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

module.exports = { orderController, allOrderController };