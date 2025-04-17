const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Route Imports
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const lostItemRoutes = require('./routes/lostItemRoutes');    
const foundItemRoutes = require('./routes/foundItemRoutes');   

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

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

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/lost-items', lostItemRoutes);     
app.use('/api/found-items', foundItemRoutes);   

// Serve static frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

app.get('/', (req, res) => {
  res.send('Lost and Found API Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
