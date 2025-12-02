// Import user model to access user data from database
const userModel = require("../../models/userModel")

// Controller to get all users from the database
async function allUsers(req, res) {
    try {
        // Log the currently logged-in user's ID for debugging
        console.log("Logged-in userId (for admin check):", req.userId)

        // Fetch all users from the database
        const allUsers = await userModel.find()
        
        // Send the list of all users in the response
        res.json({
            message: "All Users",
            data: allUsers,
            success: true,
            error: false
        })
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
module.exports = allUsers
