const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); 

  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid or expired token.' });
  }
};

// Profile route to get the user profile
const getProfile = async (req, res) => {
  try {
    console.log(req.user)
    const userId = req.user._id; 

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User profile fetched successfully',
      profile: {
        id: user._id,
        username: user.username,
        email: user.email,
        // Add other user fields as necessary
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

module.exports = { verifyToken, getProfile };
