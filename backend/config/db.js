// Import the mongoose library to work with MongoDB in Node.js
const mongoose = require("mongoose")

// Create an async function to handle the MongoDB connection process
async function connectDB(){
    try{
        // Connect to MongoDB using the connection string from the .env file
        // This ensures sensitive information (username/password/cluster URL) stays secure
        await mongoose.connect(process.env.MONGODB_URI)

        // If the connection is successful, log a confirmation message
        console.log("Connected to MongoDB successfully!")
    }catch(err){
        // If the connection fails, catch the error and log it
        console.log("MongoDB connection error:", err)
    }
}

// Export the connectDB function so other files (like server.js or app.js) can call it to connect to the database
module.exports = connectDB
