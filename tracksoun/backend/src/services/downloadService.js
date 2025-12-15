const fs = require('fs');
const path = require('path');
const { Track } = require('../models/Track');
const { User } = require('../models/User');

const downloadTrack = async (trackId, userId) => {
    try {
        const track = await Track.findById(trackId);
        if (!track) {
            throw new Error('Track not found');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const downloadPath = path.join(__dirname, '../../downloads', `${track.title}.mp3`);
        // Logic to download the track from YouTube and save it to downloadPath

        // Update user with downloaded track information
        user.downloadedTracks.push(trackId);
        await user.save();

        return { success: true, message: 'Track downloaded successfully', path: downloadPath };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

const getDownloadedTracks = async (userId) => {
    try {
        const user = await User.findById(userId).populate('downloadedTracks');
        if (!user) {
            throw new Error('User not found');
        }

        return { success: true, tracks: user.downloadedTracks };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = {
    downloadTrack,
    getDownloadedTracks,
};