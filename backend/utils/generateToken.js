// Generate JWT token for a user ID
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // Sign token with user id and secret, expires in 24h
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
};

module.exports = generateToken;