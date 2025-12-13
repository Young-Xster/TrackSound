const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        default: 'Unknown Artist',
    },
    youtubeId: {
        type: String,
        required: true,
        unique: true,
    },
    duration: {
        type: Number, // duration in seconds
        
    },
    thumbnailUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Track', trackSchema);