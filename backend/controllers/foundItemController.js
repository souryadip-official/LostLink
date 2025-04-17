const FoundItem = require('../models/FoundItem');

// Get all found items
const getFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch found items' });
  }
};

// Add a new found item
const createFoundItem = async (req, res) => {
  try {
    const { itemName, description, location, date, gmail, phone, department, rollNumber } = req.body;
    if (!itemName || !gmail || !phone) {
      return res.status(400).json({ message: 'Item name, Gmail, and phone are required fields' });
    }

    const foundItem = new FoundItem({
      itemName,
      description,
      location,
      date,
      gmail,
      phone,
      department,
      rollNumber
    });

    await foundItem.save();
    res.status(201).json({ message: 'Item reported successfully!', foundItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating found item', error });
  }
};

// Get a found item by ID
const getFoundItemById = async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Found item not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get found item' });
  }
};

// Update found item
const updateFoundItem = async (req, res) => {
  const { id } = req.params;
  const { itemName, description, location, date, gmail, phone, department, rollNumber } = req.body;

  try {
    // Find the item by ID
    const item = await FoundItem.findById(id);
    if (!item) return res.status(404).json({ error: 'Found item not found' });

    // Update fields
    item.itemName = itemName || item.itemName;
    item.description = description || item.description;
    item.location = location || item.location;
    item.date = date || item.date;
    item.gmail = gmail || item.gmail;
    item.phone = phone || item.phone;
    item.department = department || item.department;
    item.rollNumber = rollNumber || item.rollNumber;

    // Save updated item
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update found item' });
  }
};

// Delete found item
const deleteFoundItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await FoundItem.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ error: 'Found item not found' });

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
