// -------------------------------------------------------
// Import JWT package for checking and verifying tokens
// -------------------------------------------------------
const jwt = require('jsonwebtoken')

// -------------------------------------------------------
// Authentication Middleware
// This middleware does the following:
// 1. Checks if the user has a token in cookies
// 2. Verifies the token using a secret key
// 3. Takes the user ID from the token and saves it to req.userId
// 4. If everything is correct → move to next()
// -------------------------------------------------------
async function authToken(req, res, next) {
    try {

        // ---------------------------------------------------
        // Get the token from cookies
        // The ?. prevents error if cookies is undefined
        // ---------------------------------------------------
        const token = req.cookies?.token

        console.log("token", token)

        // ---------------------------------------------------
        // If no token → user is not logged in
        // ---------------------------------------------------
        if (!token) {
            return res.status(200).json({
                message: "Please Login...!",
                error: true,
                success: false
            })
        }

        // ---------------------------------------------------
        // Verify the token using the secret key
        // This gives:
        // - err → if token is invalid or expired
        // - decoded → the original data stored inside token (userID, email)
        // ---------------------------------------------------
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            console.log("error:", err)
            console.log("decoded:", decoded)

            // ---------------------------------------------------
            // If token verification fails
            // (expired token, wrong token, or tampered token)
            // ---------------------------------------------------
            if (err) {
                console.log("Error in auth verification:", err)
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false
                })
            }

            // ---------------------------------------------------
            // Save user ID from decoded token into req.userId
            // This helps other routes know which user is making the request
            // ---------------------------------------------------
            req.userId = decoded?._id

            // ---------------------------------------------------
            // Everything OK → allow request to continue
            // ---------------------------------------------------
            next()
        });

    } catch (err) {

        // ---------------------------------------------------
        // Handle any unexpected error in the middleware
        // ---------------------------------------------------
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        })
    }
}

// -------------------------------------------------------
// Export the middleware so it can be used in other files
// -------------------------------------------------------
module.exports = authToken
