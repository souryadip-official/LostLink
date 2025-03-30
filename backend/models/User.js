const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min:8
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  year: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  branch: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true,
    match: /^[A-C]$/ 
  },
  rollNumber: {
    type: String,
    required: true,
    match: /^\d{7}$/,  
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
