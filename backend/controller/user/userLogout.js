// Controller to log out the currently logged-in user
async function userLogout(req, res) {
    try {
        // Cookie options to clear the token securely
        const tokenOption = {
            httpOnly: true,   // Cookie cannot be accessed by JavaScript (for security)
            secure: true,     // Cookie sent only over HTTPS
            sameSite: 'None'  // Allow cross-site cookie usage
        }

        // Clear the token cookie to log out the user
        res.clearCookie("token", tokenOption)

        // Send success response
        res.json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        })
    } catch (err) {
        // If any error occurs, send error response
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

// Export controller to use in routes
module.exports = userLogout
