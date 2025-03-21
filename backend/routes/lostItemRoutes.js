const express = require('express');
const { 
  getLostItems, 
  createLostItem, 
  getLostItemById, 
  updateLostItem, 
  deleteLostItem 
} = require('../controllers/lostItemController');

const router = express.Router();

// Routes
router.get('/', getLostItems);                  // Get all lost items
router.post('/', createLostItem);                // Add a lost item
router.get('/:id', getLostItemById);             // Get lost item by ID
router.put('/:id', updateLostItem);              // Update lost item by ID
router.delete('/:id', deleteLostItem);           // Delete lost item by ID

module.exports = router;
