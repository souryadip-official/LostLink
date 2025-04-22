const express = require('express');
const router = express.Router();
const ClaimRequest = require('../models/CLaimRequest'); 
const LostItem = require('../models/LostItem');

// POST route to submit a claim request
router.post('/', async (req, res) => {
  try {
    const {
      itemId,
      itemName,
      itemType,
      itemDescription,
      itemLocation,
      claimedBy,
      registeredBy,
      claimDescription,
      status,
    } = req.body;

    // Create a new claim request with the data sent from the frontend
    const newClaim = new ClaimRequest({
      itemId,
      itemName,
      itemType,
      itemDescription,
      itemLocation,
      claimedBy,
      registeredBy,
      claimDescription,
      status: status || 'pending', // Default to 'pending' if not provided
    });
    console.log("Incoming Claim Request:", req.body);
    // Save the new claim request to the database
    await newClaim.save();
    res.status(200).json({ message: 'Claim request submitted successfully!' });
  } catch (err) {
    console.error('Error submitting claim:', err);
    res.status(500).json({ message: 'Failed to submit claim' });
  }
});

// GET route to fetch all claims (For admin use)
router.get('/', async (req, res) => {
  try {
    const claims = await ClaimRequest.find().populate('itemId', 'itemName'); // Populate the itemId for easier access to item details
    res.status(200).json(claims);
  } catch (err) {
    console.error('Error fetching claims:', err);
    res.status(500).json({ message: 'Failed to fetch claims' });
  }
});

// GET route to fetch pending claims (For admin use)
router.get('/pending', async (req, res) => {
    try {
      // Make sure to include the correct model for ClaimRequest or whatever model you're using
      const pendingRequests = await ClaimRequest.find({ status: 'pending' });
      res.status(200).json(pendingRequests);
    } catch (err) {
      console.error('Error fetching pending cases:', err);
      res.status(500).json({ message: 'Server Error' });
    }
});

// PUT route to resolve a claim (For admin use)
router.patch('/resolve/:claimId', async (req, res) => {
    const { claimId } = req.params;
    console.log(claimId);
    try {
      const claim = await ClaimRequest.findById(claimId);
      console.log("Attempting to resolve claim with ID:", req.params.claimId);
      if (!claim) {
        return res.status(404).json({ message: 'Claim not found' });
      }
      // Resolve the claim and move it to 'resolved' status
      claim.status = 'resolved';
      await claim.save();
      console.log("Resolved: ", req.params.claimId);
  
      res.status(200).json({ message: 'Claim successfully resolved' });
    } catch (err) {
      console.error('Error resolving claim:', err);
      res.status(500).json({ message: 'Failed to resolve claim' });
    }
});

// Fetch resolved cases
router.get('/resolved', async (req, res) => {
  try {
    // Query to fetch resolved cases (you might need to adjust the conditions)
    const resolvedCases = await ClaimRequest.find({ status: 'resolved' }); 
    res.json(resolvedCases); // Sending resolved cases as JSON
  } catch (err) {
    console.error('Error fetching resolved cases:', err);
    res.status(500).json({ message: 'Failed to fetch resolved cases' });
  }
});

// DELETE route to remove a claim (For admin use)
router.delete('/:claimId', async (req, res) => {
  const { claimId } = req.params;
  try {
    console.log('Received claimId:', claimId);
    const claim = await ClaimRequest.findByIdAndDelete(claimId);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    // Delete the claim request from the database
    res.status(200).json({ message: 'Claim request deleted successfully' });
  } catch (err) {
    console.error('Error deleting claim:', err);
    res.status(500).json({ message: 'Failed to delete claim' });
  }
});

module.exports = router;
