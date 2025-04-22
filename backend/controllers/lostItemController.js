const LostItem = require('../models/LostItem');

// Get all lost items
const getLostItems = async (req, res) => {
  try {
    const items = await LostItem.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lost items' });
  }
};

// Add a new lost item
const createLostItem = async (req, res) => {
  const {
    itemName,
    description,
    location,
    date,
    gmail,
    phone,
    department,
    rollNumber
  } = req.body;

  try {
    const newItem = new LostItem({
      itemName,
      description,
      location,
      date,
      gmail,
      phone,
      department,
      rollNumber
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lost item' });
  }
};

// Get a lost item by ID
const getLostItemById = async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Lost item not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get lost item' });
  }
};

// Update lost item
const updateLostItem = async (req, res) => {
  try {
    const updatedItem = await LostItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Lost item not found' });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lost item' });
  }
};

// Delete lost item
const deleteLostItem = async (req, res) => {
  try {
    const deletedItem = await LostItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: 'Lost item not found' });
    res.status(200).json({ message: 'Lost item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lost item' });
  }
};

module.exports = {
  getLostItems,
  createLostItem,
  getLostItemById,
  updateLostItem,
  deleteLostItem
};
