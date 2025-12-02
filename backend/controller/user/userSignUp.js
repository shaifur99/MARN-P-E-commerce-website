// Import user model to access user data in MongoDB
const userModel = require("../../models/userModel")

// Import bcrypt to hash passwords
const bcrypt = require('bcryptjs')

// Controller to sign up a new user (register)
async function userSignUpController(req, res) {
    try {
        // Extract email, password, and name from request body
        const { email, password, name } = req.body

        // Check if a user with the same email already exists
        const user = await userModel.findOne({ email })
        console.log("Existing user:", user)

        if (user) {
            throw new Error("User already exists.")
        }

        // Validate required fields
        if (!email) throw new Error("Please provide email")
        if (!password) throw new Error("Please provide password")
        if (!name) throw new Error("Please provide name")

        // Generate salt for hashing the password
        const salt = bcrypt.genSaltSync(10)
        // Hash the password
        const hashPassword = await bcrypt.hashSync(password, salt)

        if (!hashPassword) {
            throw new Error("Something went wrong while hashing password")
        }

        // Prepare payload for the new user
        const payload = {
            ...req.body,       // include all fields from request body
            role: "GENERAL",   // default role
            password: hashPassword  // store hashed password
        }

        // Save new user data in MongoDB
        const userData = new userModel(payload)
        const saveUser = await userData.save()

        // Send success response
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!"
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
module.exports = userSignUpController
