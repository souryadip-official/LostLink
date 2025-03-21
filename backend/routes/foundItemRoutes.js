const express = require('express');
const { 
  getFoundItems, 
  createFoundItem, 
  getFoundItemById, 
  updateFoundItem, 
  deleteFoundItem 
} = require('../controllers/foundItemController');

const router = express.Router();

// Routes
router.get('/', getFoundItems);                   // Get all found items
router.post('/', createFoundItem);                 // Add a found item
router.get('/:id', getFoundItemById);              // Get found item by ID
router.put('/:id', updateFoundItem);               // Update found item by ID
router.delete('/:id', deleteFoundItem);            // Delete found item by ID

module.exports = router;
