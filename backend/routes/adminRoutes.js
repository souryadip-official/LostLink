const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

// Load admin credentials from .env
const admins = [
  { id: process.env.ADMIN_1_ID, password: process.env.ADMIN_1_PASS },
  { id: process.env.ADMIN_2_ID, password: process.env.ADMIN_2_PASS },
  { id: process.env.ADMIN_3_ID, password: process.env.ADMIN_3_PASS },
  { id: process.env.ADMIN_4_ID, password: process.env.ADMIN_4_PASS },
  { id: process.env.ADMIN_5_ID, password: process.env.ADMIN_5_PASS }
];

const JWT_SECRET = process.env.JWT_SECRET || 'superSecretKey'; 
const TOKEN_EXPIRATION = '24h';  // Updated to 24 hours

// ✅ Admin login route → Generates JWT token with 24-hour validity
router.post('/login', (req, res) => {
  const { adminId, password } = req.body;

  if (!adminId || !password) {
    return res.status(400).json({ message: 'Please provide admin ID and password.', success: false });
  }

  const admin = admins.find(a => a.id === adminId && a.password === password);

  if (admin) {
    const token = jwt.sign({ adminId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

    res.status(200).json({
      message: 'Admin verified successfully.',
      success: true,
      token
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials.', success: false });
  }
});

// ✅ Middleware to verify JWT token and session validity
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Access denied.', success: false });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach admin info to the request object
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.', success: false });
  }
};

// ✅ Protected route → Only accessible with a valid token
router.get('/dashboard', verifyToken, (req, res) => {
  res.status(200).json({
    message: `Welcome Admin ${req.admin.adminId}!`,
    success: true
  });
});

// ✅ Mock stats route → Only accessible with a valid token
router.get('/stats', verifyToken, (req, res) => {
  const stats = {
    users: 120,         // Mock user count
    items: 340,         // Mock total items count
    lost: 85,           // Mock lost items count
    found: 255          // Mock found items count
  };

  res.status(200).json({
    message: 'Stats retrieved successfully.',
    success: true,
    stats
  });
});

module.exports = router;
