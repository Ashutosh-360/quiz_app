const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const User = require('../../models/User');
const { validateLogin } = require('../../utils/validators'); // Validator for login input

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("login details", email, password);

  // Validate input data
  const errors = {};
  console.log("login errors", errors);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    console.log("user found", user);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Ensure you have a JWT_SECRET in your environment variables
      { expiresIn: '1h' } // Token expiration time
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

module.exports = { login };
