const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Serve static files from the frontend's build directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  
  // All other routes should serve the React app (catch-all route)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// API routes
app.use('/api/users', userRoutes); 

app.get('/', (req, res) => {
  res.send('Lost and Found API Running...');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
