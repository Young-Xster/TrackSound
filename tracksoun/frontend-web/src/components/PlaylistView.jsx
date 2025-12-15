import React, { useEffect, useState, useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { fetchPlaylists } from '../services/api';

const PlaylistView = () => {
    const { setCurrentTrack } = useContext(PlayerContext);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPlaylists = async () => {
            try {
                const data = await fetchPlaylists();
                setPlaylists(data);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPlaylists();
    }, []);

    const handleTrackSelect = (track) => {
        setCurrentTrack(track);
    };

    if (loading) {
        return <div>Loading playlists...</div>;
    }

    return (
        <div>
            <h2>Your Playlists</h2>
            {playlists.length === 0 ? (
                <p>No playlists available.</p>
            ) : (
                <ul>
                    {playlists.map((playlist) => (
                        <li key={playlist._id}>
                            <h3>{playlist.title}</h3>
                            <ul>
                                {playlist.tracks.map((track) => (
                                    <li key={track._id} onClick={() => handleTrackSelect(track)}>
                                        {track.title} - {track.artist}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlaylistView;