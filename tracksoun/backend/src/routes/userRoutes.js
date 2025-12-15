const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get user profile
router.get('/profile', authenticate, getUserProfile);

// Route to update user profile
router.put('/profile', authenticate, updateUserProfile);

module.exports = router;