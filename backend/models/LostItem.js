const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dateLost: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'   // Reference to User model
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const LostItem = mongoose.model('LostItem', lostItemSchema);

module.exports = LostItem;