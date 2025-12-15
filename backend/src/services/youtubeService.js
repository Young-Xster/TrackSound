const YouTube = require("youtube-sr").default;
const ytdl = require("ytdl-core");

module.exports = {
  searchTracks: async (query) => {
    try {
      const videos = await YouTube.search(query, { limit: 10, type: "video" });
      return videos.map((video) => ({
        youtubeId: video.id,
        title: video.title,
        artist: video.channel ? video.channel.name : "Unknown",
        thumbnailUrl: video.thumbnail ? video.thumbnail.url : "",
        duration: video.duration / 1000, // Convert ms to seconds
      }));
    } catch (error) {
      console.error("YouTube Search Error:", error);
      throw new Error("Failed to search YouTube");
    }
  },

  streamAudio: async (videoId, res) => {
    try {
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      // Get audio formats
      const info = await ytdl.getInfo(videoUrl);
      const format = ytdl.chooseFormat(info.formats, {
        quality: "highestaudio",
        filter: "audioonly",
      });

      // Pipe the stream to the response
      ytdl(videoUrl, { format: format }).pipe(res);
    } catch (error) {
      console.error("YouTube Stream Error:", error);
      throw new Error("Failed to stream audio");
    }
  },
};
