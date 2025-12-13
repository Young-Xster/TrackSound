const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new playlist
router.post('/', authMiddleware.verifyToken, playlistController.createPlaylist);

// Get all playlists for a user
router.get('/', authMiddleware.verifyToken, playlistController.getUserPlaylists);

// Get a specific playlist by ID
router.get('/:id', authMiddleware.verifyToken, playlistController.getPlaylistById);

// Update a playlist by ID
router.put('/:id', authMiddleware.verifyToken, playlistController.updatePlaylist);

// Delete a playlist by ID
router.delete('/:id', authMiddleware.verifyToken, playlistController.deletePlaylist);

module.exports = router;