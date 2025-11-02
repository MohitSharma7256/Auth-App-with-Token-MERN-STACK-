const express = require('express');
const router = express.Router();
const { register, login, resetPassword } = require('../controllers/authControllers');

// Auth routes
router.post('/register', register);
router.post('/login', login);

// Temporary route for testing - remove in production
router.post('/reset-password', resetPassword);

module.exports = router;