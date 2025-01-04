const bcrypt = require('bcrypt');
const User = require('../../models/User');
const { validateSignUp } = require('../../utils/validators');

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("user det",name,email,password)
  // Validate input data
  const errors = validateSignUp({ name, email, password });
  console.log("error",errors)
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    console.log("exits",existingUser)
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    console.log("going to save",newUser)

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};


module.exports = { signUp }; // Ensure you're exporting signUp
