const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const User = require('../../models/User');
const { validateLogin } = require('../../utils/validators'); // Validator for login input

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input data
  const errors ={}
  // validateLogin(email, password); // Use your validator to populate `errors`
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    
    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error("Server error:", error); // Log for debugging
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

module.exports = { login };
