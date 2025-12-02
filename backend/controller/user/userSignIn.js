// Import bcrypt to hash and compare passwords
const bcrypt = require('bcryptjs')

// Import user model to fetch user data from MongoDB
const userModel = require('../../models/userModel')

// Import jwt to generate authentication tokens
const jwt = require('jsonwebtoken')

// Controller to sign in a user (login)
async function userSignInController(req, res) {
    try {
        // Extract email and password from request body
        const { email, password } = req.body

        // Validate request inputs
        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }

        // Find the user in database by email
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error("User not found")
        }

        // Compare provided password with stored hashed password
        const checkPassword = await bcrypt.compare(password, user.password)
        console.log("Password match:", checkPassword)

        if (checkPassword) {
            // Prepare payload for JWT token
            const tokenData = {
                _id: user._id,
                email: user.email,
            }

            // Sign JWT token with secret key, expiry 8 hours
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 })

            // Set cookie options for security
            const tokenOption = {
                httpOnly: true,  // cannot access cookie via JavaScript
                secure: true,    // only sent over HTTPS
                sameSite: 'None' // allow cross-site usage
            }

            // Send token as cookie and success response
            res.cookie("token", token, tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            })
        } else {
            // If password doesn't match
            throw new Error("Please check Password")
        }

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
module.exports = userSignInController
