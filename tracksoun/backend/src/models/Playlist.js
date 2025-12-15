const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trackIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
    }],
}, { timestamps: true });

module.exports = mongoose.model('Playlist', PlaylistSchema);