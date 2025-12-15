import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PlayerContext } from '../context/PlayerContext';
import api from '../services/api';
import PlaylistView from '../components/PlaylistView';
import SearchBar from '../components/SearchBar';

const Library = () => {
    const { user } = useContext(AuthContext);
    const { setCurrentTrack } = useContext(PlayerContext);
    const [tracks, setTracks] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchLibraryData = async () => {
            try {
                const trackResponse = await api.get(`/tracks/user/${user.id}`);
                const playlistResponse = await api.get(`/playlists/user/${user.id}`);
                setTracks(trackResponse.data);
                setPlaylists(playlistResponse.data);
            } catch (error) {
                console.error('Error fetching library data:', error);
            }
        };

        fetchLibraryData();
    }, [user.id]);

    const handleTrackSelect = (track) => {
        setCurrentTrack(track);
    };

    return (
        <div className="library">
            <h1>Your Library</h1>
            <SearchBar />
            <h2>Saved Tracks</h2>
            <div className="track-list">
                {tracks.map(track => (
                    <div key={track.id} onClick={() => handleTrackSelect(track)}>
                        <p>{track.title} - {track.artist}</p>
                    </div>
                ))}
            </div>
            <h2>Your Playlists</h2>
            <PlaylistView playlists={playlists} />
        </div>
    );
};

export default Library;