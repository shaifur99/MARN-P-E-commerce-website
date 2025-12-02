// Import the userModel so we can get user data from the database
const userModel = require("../models/userModel")

// Function to check if a user has permission to upload a product
const uploadProductPermission = async(userId) => {

    // Find the user in the database using the userId
    const user = await userModel.findById(userId)

    // Check if the user's role is ADMIN
    // If the user is ADMIN, they are allowed to upload products
    if(user.role === 'ADMIN'){
        return true   // Return true = permission given
    }

    // If the user is not ADMIN, they do NOT have permission
    return false
}

// Export the function so it can be used in other files
module.exports = uploadProductPermission
