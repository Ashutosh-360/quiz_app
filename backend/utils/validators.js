const validateEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };
  
  const validatePassword = (password) => {
    // Password should be at least 8 characters long and contain one number
    return password.length >= 8 && /\d/.test(password);
  };
  
  
  const validateSignUp = (data) => {
    const errors = {};
  
    if (!data.name || data.name.trim() === '') errors.name = 'Name is required';
    if (!data.email || !validateEmail(data.email)) errors.email = 'Invalid email address';
    if (!data.password || !validatePassword(data.password)) errors.password = 'Password must be at least 8 characters long and contain a number';
  
    return errors;
  };
  
  module.exports = { validateSignUp };
  