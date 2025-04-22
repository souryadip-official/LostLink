const mongoose = require('mongoose');

const claimRequestSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoundItem',  // Reference to the item being claimed
    required: true,
  },
  itemName: String,
  itemType: String,
  itemDescription: String,
  itemLocation: String,
  claimedBy: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: String,
    phone: String,
    department: String,
    rollNumber: String,
  },
  registeredBy: {
    email: String,
    phone: String,
    department: String,
    rollNumber: String,
  },
  claimDescription: String,  // Proof of ownership/matching details
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending',  // Default status for new claims
  },
}, { timestamps: true });

module.exports = mongoose.model('ClaimRequest', claimRequestSchema);
