const bcrypt = require('bcrypt');
const User = require('../../models/User');
const { validateSignUp } = require('../../utils/validators');

const getUsers = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("user det",name,email,password)
  // Validate input data

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
   
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    console.log("exits",existingUser)
    // Hash the password

   // const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword)

    // Create new user
    const newUser = new User({
      name,
      email,
      password: password,
    });

    console.log("going to save",newUser)

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};


module.exports = { signUp }; // Ensure you're exporting signUp
