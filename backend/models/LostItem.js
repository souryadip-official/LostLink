const mongoose = require('mongoose');

// Define the schema for a lost item report
const lostItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  gmail: { type: String, required: true }, 
  phone: { type: String, required: true }, 
  department: { type: String, required: true }, 
  rollNumber: { type: String, required: true }
});

const LostItem = mongoose.model('LostItem', lostItemSchema);

module.exports = LostItem;
