const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    youtubeId: {
        type: String,
        required: true,
        unique: true,
    },
    duration: {
        type: Number, // Duration in seconds
        required: true,
    },
    thumbnail: {
        type: String, // URL for the track's thumbnail image
    },
    metadata: {
        type: Object, // Additional metadata (e.g., genre, release date)
        default: {},
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;