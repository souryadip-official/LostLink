const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cors = require('cors'); 
const jwt = require('jsonwebtoken');  
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // Extract token

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;  
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

const PORT = process.env.PORT || 5000;

// Serve static frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);  

app.get('/', (req, res) => {
  res.send('Lost and Found API Running...');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
