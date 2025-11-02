// Import jsonwebtoken for verifying JWT tokens
const jwt = require('jsonwebtoken');
// Import User model to fetch user details from database
const User = require('../models/User');

// Middleware to protect routes and verify user authentication
const protect = async (req, res, next) => {
    let token;
    // Check if Authorization header with Bearer token exists
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token and decode payload
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            // Attach user object (without password) to request
            req.user = await User.findById(decode.id).select('-password');
            // Proceed to next middleware or route handler
            next();
        } catch (error) {
            // If token verification fails, respond with 401 Unauthorized
            res.status(401).json({ message: 'Not Authorized, token failed' });
        }
    }
    // If no token is provided, respond with 401 Unauthorized
    if (!token) {
        res.status(401).json({ message: 'No Token, Authorization denied' });
    }
}

// Export the protect middleware for use in route protection
module.exports = protect;