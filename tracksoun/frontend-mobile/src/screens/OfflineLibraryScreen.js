import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getDownloadedTracks } from '../services/offlineStorage';
import MobilePlayer from '../components/MobilePlayer';

const OfflineLibraryScreen = () => {
    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);

    useEffect(() => {
        const fetchDownloadedTracks = async () => {
            const downloadedTracks = await getDownloadedTracks();
            setTracks(downloadedTracks);
        };

        fetchDownloadedTracks();
    }, []);

    const handleTrackSelect = (track) => {
        setSelectedTrack(track);
    };

    const renderTrackItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleTrackSelect(item)}>
            <View>
                <Text>{item.title}</Text>
                <Text>{item.artist}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <Text>Offline Library</Text>
            <FlatList
                data={tracks}
                renderItem={renderTrackItem}
                keyExtractor={(item) => item.id}
            />
            {selectedTrack && <MobilePlayer track={selectedTrack} />}
        </View>
    );
};

export default OfflineLibraryScreen;