const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');
const authMiddleware = require('../middleware/authMiddleware');
const { route } = require('./authRoutes');

router.get('/search', authMiddleware.verifyToken, trackController.searchTracks);

router.get('/stream/:videoId', authMiddleware.verifyToken, trackController.streamTrack);

router.get('/download/:videoId', authMiddleware.verifyToken, trackController.downloadTrack);

router.post('/library', authMiddleware.verifyToken, trackController.addToLibrary);

// Route to get track details by ID (Keep this last to avoid conflicts)
router.get('/:id', authMiddleware.verifyToken, trackController.getTrackDetails);


module.exports = router;