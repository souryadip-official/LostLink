const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Serve frontend production build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Add routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Lost and Found API Running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
