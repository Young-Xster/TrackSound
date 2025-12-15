const Playlist = require('../models/Playlist');

// Create a new playlist
exports.createPlaylist = async (req, res) => {
    const { title } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        const newPlaylist = new Playlist({ title, userId });
        await newPlaylist.save();
        res.status(201).json(newPlaylist);
    } catch (error) {
        res.status(500).json({ message: 'Error creating playlist', error });
    }
};

// Get all playlists for a user
exports.getPlaylists = async (req, res) => {
    const userId = req.user.id;

    try {
        const playlists = await Playlist.find({ userId });
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving playlists', error });
    }
};

// Update a playlist
exports.updatePlaylist = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        const updatedPlaylist = await Playlist.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(200).json(updatedPlaylist);
    } catch (error) {
        res.status(500).json({ message: 'Error updating playlist', error });
    }
};

// Delete a playlist
exports.deletePlaylist = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(id);
        if (!deletedPlaylist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting playlist', error });
    }
};