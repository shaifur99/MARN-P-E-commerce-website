const mongoose = require('mongoose')   // Import mongoose for schema and model

// Schema for user data
const userSchema = new mongoose.Schema({

    name : String,                     // User's name

    email : {                          // User's email address
        type : String,
        unique : true,                 // No two users can have the same email
        required : true                // Email must be provided
    },

    password : String,                 // Encrypted user password
    profilePic : String,               // URL of user profile picture
    role : String,                     // User role (ADMIN or USER)

}, {
    timestamps : true                  // Auto adds createdAt and updatedAt
})

// Create user model for database
const userModel = mongoose.model("user", userSchema)

// Export user model for use in other files
module.exports = userModel
