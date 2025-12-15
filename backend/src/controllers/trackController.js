const Track = require("../models/Track");
const youtubeService = require("../services/youtubeService");

exports.searchTracks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const results = await youtubeService.searchTracks(query);

    res.status(200).json(results);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Error searching YouTube" });
  }
};

exports.streamTrack = async (req, res) => {
  try {
    const { videoId } = req.params;

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Transfer-Encoding", "chunked");

    await youtubeService.streamAudio(videoId, res);
  } catch (error) {
    console.error("Stream Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Error streaming track" });
    }
  }
};

exports.downloadTrack = async (req, res) => {
  try {
    const { videoId } = req.params;

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${videoId}.mp3"`
    );
    res.setHeader("Content-Type", "audio/mpeg");

    await youtubeService.streamAudio(videoId, res);
  } catch (error) {
    console.error("Download Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Error downloading track" });
    }
  }
};

exports.addToLibrary = async (req, res) => {
  try {
    const { videoId, title, artist, thumbnail, duration } = req.body;
    const userId = req.userID; // Fixed: matches authMiddleware

    let track = await Track.findOne({ youtubeId: videoId });

    if (!track) {
      track = await Track.create({
        youtubeId: videoId,
        title,
        artist,
        thumbnailUrl: thumbnail,
        duration,
      });
    }
    res.status(200).json({ message: "Added to library", track });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to library", error: error.message });
  }
};

exports.getTrackDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const track = await Track.findById(id);
    if (!track) {
      return res.status(404).json({ message: "Track not found" });
    }

    res.status(200).json(track);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching track details", error: error.message });
  }
};
