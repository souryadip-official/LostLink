const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Add routes
app.use('/api/users', userRoutes);   // Mount the user routes

app.get('/', (req, res) => {
  res.send('Lost and Found API Running...');
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
