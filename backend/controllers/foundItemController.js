const FoundItem = require('../models/FoundItem');

// Get all found items
const getFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find().populate('user', 'name email');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch found items' });
  }
};

// Add a new found item
const createFoundItem = async (req, res) => {
  const { itemName, description, location, dateFound, user } = req.body;

  try {
    const newItem = new FoundItem({
      itemName,
      description,
      location,
      dateFound,
      user
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create found item' });
  }
};

// Get found item by ID
const getFoundItemById = async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id).populate('user', 'name email');
    if (!item) {
      return res.status(404).json({ error: 'Found item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get found item' });
  }
};

// Update found item by ID
const updateFoundItem = async (req, res) => {
  try {
    const updatedItem = await FoundItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update found item' });
  }
};

// Delete found item by ID
const deleteFoundItem = async (req, res) => {
  try {
    await FoundItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Found item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete found item' });
  }
};

module.exports = {
  getFoundItems,
  createFoundItem,
  getFoundItemById,
  updateFoundItem,
  deleteFoundItem
};