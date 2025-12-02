// Import user model to access and update user data in database
const userModel = require("../../models/userModel")

// Controller to update user details
async function updateUser(req, res) {
    try {
        // Get the currently logged-in user's ID (from auth middleware)
        const sessionUser = req.userId

        // Extract fields from request body
        const { userId, email, name, role } = req.body

        // Prepare payload to update only provided fields
        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role }),
        }

        // Fetch the logged-in user's details (optional, e.g., for role check or debugging)
        const user = await userModel.findById(sessionUser)
        console.log("Logged-in user role:", user.role)

        // Update the target user by ID with the prepared payload
        const updateUser = await userModel.findByIdAndUpdate(userId, payload)

        // Send success response with updated user info
        res.json({
            data: updateUser,
            message: "User updated successfully",
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
module.exports = updateUser
