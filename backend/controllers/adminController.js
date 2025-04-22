const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const adminsFilePath = path.join(__dirname, '../config/admins.json');
const admins = JSON.parse(fs.readFileSync(adminsFilePath, 'utf-8'));

const TOKEN_EXPIRATION = '24h';  

const loginAdmin = async (req, res) => {
  const { adminId, password } = req.body;

  const admin = admins.find((a) => a.adminId === adminId);

  if (!admin || admin.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // ✅ Generate token with 24-hour expiration
  const token = jwt.sign(
    { id: admin.adminId, role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRATION }
  );

  res.status(200).json({
    message: 'Login successful',
    token,
  });
};

const protectedRoute = (req, res) => {
  res.json({ message: 'You have accessed a protected route!', admin: req.admin });
};

module.exports = { loginAdmin, protectedRoute };
