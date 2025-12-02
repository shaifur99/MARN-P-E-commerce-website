// Import user model to access user data from database
const userModel = require("../../models/userModel")

// Controller to get details of the currently logged-in user
async function userDetailsController(req, res) {
    try {
        // Log the currently logged-in user's ID for debugging
        console.log("Logged-in userId:", req.userId)

        // Fetch user details from database using the logged-in user's ID
        const user = await userModel.findById(req.userId)

        // Send success response with user details
        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details fetched successfully"
        })

        // Optional: log the fetched user details for debugging
        console.log("Fetched user:", user)

    } catch (err) {
        // If any error occurs, send error response
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

// Export controller to use in routes
module.exports = userDetailsController
