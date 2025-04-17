const express = require('express');
const { getFoundItems, getFoundItemById, createFoundItem, updateFoundItem, deleteFoundItem } = require('../controllers/foundItemController');

const router = express.Router();

// Handling form submission and saving data (no image logic)
router.get('/', getFoundItems);
router.post('/', createFoundItem);
router.get('/:id', getFoundItemById);       
router.put('/:id', updateFoundItem);
router.delete('/:id', deleteFoundItem);

module.exports = router;