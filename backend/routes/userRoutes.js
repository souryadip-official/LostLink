const express = require('express');
const { getUsers, createUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Routes
router.get('/', getUsers);                   // Get all users
router.post('/', createUser);                 // Create a new user
router.get('/:id', getUserById);              // Get user by ID
router.put('/:id', updateUser);               // Update user by ID
router.delete('/:id', deleteUser);            // Delete user by ID

module.exports = router;
