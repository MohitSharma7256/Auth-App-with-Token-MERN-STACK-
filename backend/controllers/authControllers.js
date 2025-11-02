const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User registration
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        status: 'error',
        message: 'Email already registered' 
      });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    // Send success response
    res.status(201).json({ 
      status: 'success',
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        username: user.username 
      } 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Server error during registration' 
    });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() })
                         .select('+password');
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    // Send success response
    return res.status(200).json({
      status: 'success',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username
        }
      }
    });

  } catch (error) {
    console.error('Login error details:', error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred during login'
    });
  }
};