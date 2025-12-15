import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import TrackListItem from '../components/TrackListItem';
import { fetchTracks } from '../services/audioService';

const HomeScreen = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTracks = async () => {
            try {
                const fetchedTracks = await fetchTracks();
                setTracks(fetchedTracks);
            } catch (error) {
                console.error("Error fetching tracks:", error);
            } finally {
                setLoading(false);
            }
        };

        loadTracks();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading tracks...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={tracks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TrackListItem track={item} />}
            />
        </View>
    );
};

export default HomeScreen;