// Import required packages
const express = require('express')        // Express framework
const cors = require('cors')              // Handle cross-origin requests
const cookieParser = require('cookie-parser') // Read and write cookies
require('dotenv').config()                // Load environment variables
const connectDB = require('./config/db')  // Database connection file
const router = require('./routes')        // All routes

// Create Express app
const app = express()

// Enable CORS so frontend can access backend
// credentials: true allows sending cookies
app.use(cors({
    origin: process.env.FRONTEND_URL,     // Frontend URL
    credentials: true
}))

// Parse JSON data from requests
app.use(express.json())

// Parse cookies from client
app.use(cookieParser())

// All routes will start with /api
app.use("/api", router)

// Set server port
const PORT = process.env.PORT || 8080

// Connect to database and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to Database")
        console.log("Server is running on port " + PORT)
    })
})
