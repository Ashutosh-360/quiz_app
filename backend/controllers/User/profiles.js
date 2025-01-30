const jwt = require('jsonwebtoken');
const User = require('../../models/User');



// Profile route to get the user profile
const getProfile = async (req, res) => {
  console.log(req.header,"header")
  const token = req.header('token')?.replace('Bearer ', ''); 
  console.log(token,"token")
  if (!token) {
    return res.status(403).json({ error: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded,"dec")
    req.user = decoded;
    console.log(req.user)
    const userId = req.user.userId; 

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      info: 'User profile fetched successfully',
      profile: {
        id: user._id,
        username: user.name,
        email: user.email,
        // Add other user fields as necessary
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

module.exports = {  getProfile };
