const Playlist = require("../models/Playlist");
const Track = require("../models/Track");


exports.createPlaylist = async (req, res) => {
    const { name, isPublic } = req.body;

    try {
        const newPlaylist = new Playlist({
            name,
            user: req.userID,
            isPublic
        });
        
        await newPlaylist.save();
        res.status(201).json(newPlaylist);
    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.updatePlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { name, isPublic } = req.body;
    try {
        const playlist = await Playlist.findById(playlistId);
        if(!playlist){
            return res.status(404).json({ message: "Playlist not found" });
        }
        if(playlist.user.tostring() !== req.userID){
            return res.status(403).json({ message: "Forbidden" });
        }
        playlist.name = name || playlist.name;
        playlist.isPublic = isPublic !== undefined ? isPublic : playlist.isPublic;
        await playlist.save();
        res.status(200).json(playlist);

    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.addTrackToPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    // We expect the client to send the full track info, not just an ID
    const { videoId, title, artist, thumbnail, duration } = req.body;

    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }

        // Check ownership
        if (playlist.user.toString() !== req.userID) {
            return res.status(403).json({ message: "Forbidden" });
        }

        // 1. Check if track exists in DB
        let track = await Track.findOne({ youtubeId: videoId });

        // 2. If not, create it
        if (!track) {
            track = await Track.create({
                youtubeId: videoId,
                title,
                artist,
                thumbnailUrl: thumbnail,
                duration
            });
        }

        // 3. Add to playlist if not already there
        if (!playlist.tracks.includes(track._id)) {
            playlist.tracks.push(track._id);
            await playlist.save();
        }

        res.status(200).json({ message: "Track added to playlist", playlist });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
       

exports.removeTrackFromPlaylist = async (req, res) => {
    const { playlistId } = req.params;
    const { trackId } = req.body;
    try {
        const playlist = await Playlist.findById(playlistId);
        if(!playlist){
            return res.status(404).json({ message: "Playlist not found" });
        }
        if(playlist.user.toString() !== req.userID){
            return res.status(403).json({ message: "Forbidden" });
        }
        if(!playlist.tracks.includes(trackId)){
            return res.status(404).json({ message: "Track not in playlist" });
        }
        playlist.tracks = playlist.tracks.filter(id => id.toString() !== trackId);
        await playlist.save();
        res.status(200).json(playlist);

    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.deletePlaylist = async (req, res) => {
    const { playlistId } = req.params;

    try {
        const playlist = await Playlist.findById(playlistId);
        if(!playlist){
            return res.status(404).json({ message: "Playlist not found" });
        }
        if(playlist.user.toString() !== req.userID){
            return res.status(403).json({ message: "Forbidden" });
        }
        await Playlist.findByIdAndDelete(playlistId);
        res.status(200).json({ message: "Playlist deleted successfully" });

    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getUserPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.userID }).populate('tracks');
        res.status(200).json(playlists);
    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getPlaylistById = async (req, res) => {
    const { playlistId } = req.params;

    try {
        const playlist = await Playlist.findById(playlistId).populate('tracks');
        if(!playlist){
            return res.status(404).json({ message: "Playlist not found" });
        }
        if(!playlist.isPublic && playlist.user.toString() !== req.userID){
            return res.status(403).json({ message: "Forbidden" });
        }
        res.status(200).json(playlist);

    }catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
