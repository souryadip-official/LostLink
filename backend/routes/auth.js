const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, year, branch, section, rollNumber, password } = req.body;

  if (!name || !email || !year || !branch || !section || !rollNumber || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { rollNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or Roll Number already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      year,
      branch,
      section,
      rollNumber,
      password: hashedPassword,
      role: 'user' // Default role
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Signup error: ', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
