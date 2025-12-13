const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to search for tracks on YouTube
router.get('/search', authMiddleware.verifyToken, trackController.searchTracks);

// Route to get track details by ID
router.get('/:id', authMiddleware.verifyToken, trackController.getTrackDetails);

// Route to download a track
router.post('/download', authMiddleware.verifyToken, trackController.downloadTrack);

// Route to get all tracks for a user
router.get('/', authMiddleware.verifyToken, trackController.getUserTracks);

module.exports = router;