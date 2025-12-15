const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.verifyToken, playlistController.createPlaylist);

router.get('/', authMiddleware.verifyToken, playlistController.getUserPlaylists);

router.get('/:id', authMiddleware.verifyToken, playlistController.getPlaylistById);

router.put('/:id', authMiddleware.verifyToken, playlistController.updatePlaylist);

router.delete('/:id', authMiddleware.verifyToken, playlistController.deletePlaylist);

router.put('/:id/tracks', authMiddleware.verifyToken, playlistController.addTrackToPlaylist);

router.delete('/:id/tracks', authMiddleware.verifyToken, playlistController.removeTrackFromPlaylist);


module.exports = router;