import React from 'react';
import { useEffect, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { PlaylistView } from '../components/PlaylistView';
import { AudioPlayer } from '../components/AudioPlayer';
import { useAuth } from '../context/AuthContext';
import { usePlayer } from '../context/PlayerContext';
import api from '../services/api';

const Home = () => {
    const { user } = useAuth();
    const { currentTrack, setCurrentTrack } = usePlayer();
    const [playlists, setPlaylists] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            if (user) {
                const response = await api.get(`/playlists/${user.id}`);
                setPlaylists(response.data);
            }
        };
        fetchPlaylists();
    }, [user]);

    const handleSearch = async (query) => {
        const response = await api.get(`/tracks/search?query=${query}`);
        setSearchResults(response.data);
    };

    return (
        <div>
            <h1>Welcome to Tracksoun</h1>
            <SearchBar onSearch={handleSearch} />
            <PlaylistView playlists={playlists} />
            <AudioPlayer track={currentTrack} />
            <div>
                <h2>Search Results</h2>
                {searchResults.map(track => (
                    <div key={track.id}>
                        <h3>{track.title}</h3>
                        <button onClick={() => setCurrentTrack(track)}>Play</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;