const Track = require('../models/Track');
const youtubeService = require('../services/youtubeService');
const downloadService = require('../services/downloadService');

// Search for tracks on YouTube
exports.searchTracks = async (req, res) => {
    const { query } = req.body;
    try {
        const results = await youtubeService.searchTracks(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error searching tracks', error });
    }
};

// Get track details by ID
exports.getTrackDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const track = await Track.findById(id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        res.status(200).json(track);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving track details', error });
    }
};

// Download a track
exports.downloadTrack = async (req, res) => {
    const { id } = req.params;
    try {
        const track = await Track.findById(id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        const filePath = await downloadService.downloadTrack(track.youtubeId);
        res.status(200).json({ message: 'Track downloaded', filePath });
    } catch (error) {
        res.status(500).json({ message: 'Error downloading track', error });
    }
};

// Add a track to the database
exports.addTrack = async (req, res) => {
    const { title, artist, youtubeId } = req.body;
    try {
        const newTrack = new Track({ title, artist, youtubeId });
        await newTrack.save();
        res.status(201).json(newTrack);
    } catch (error) {
        res.status(500).json({ message: 'Error adding track', error });
    }
};

// Get all tracks
exports.getAllTracks = async (req, res) => {
    try {
        const tracks = await Track.find();
        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tracks', error });
    }
};