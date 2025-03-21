const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
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
  dateFound: {
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

const FoundItem = mongoose.model('FoundItem', foundItemSchema);

module.exports = FoundItem;
