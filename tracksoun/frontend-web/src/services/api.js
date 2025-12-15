export const api = {
  // User authentication
  login: async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  signup: async (userData) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Playlist management
  createPlaylist: async (playlistData) => {
    const response = await fetch('/api/playlists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playlistData),
    });
    return response.json();
  },

  getPlaylists: async () => {
    const response = await fetch('/api/playlists');
    return response.json();
  },

  // Track management
  searchTracks: async (query) => {
    const response = await fetch(`/api/tracks/search?query=${encodeURIComponent(query)}`);
    return response.json();
  },

  getTrackDetails: async (trackId) => {
    const response = await fetch(`/api/tracks/${trackId}`);
    return response.json();
  },

  downloadTrack: async (trackId) => {
    const response = await fetch(`/api/tracks/download/${trackId}`);
    return response.json();
  },

  // User profile management
  getUserProfile: async () => {
    const response = await fetch('/api/users/profile');
    return response.json();
  },

  updateUserProfile: async (profileData) => {
    const response = await fetch('/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    return response.json();
  },
};