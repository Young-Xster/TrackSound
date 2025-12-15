import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TrackListItem = ({ track, onSelect }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onSelect(track)}>
            <View style={styles.trackInfo}>
                <Text style={styles.trackTitle}>{track.title}</Text>
                <Text style={styles.trackArtist}>{track.artist}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    trackInfo: {
        flexDirection: 'column',
    },
    trackTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    trackArtist: {
        fontSize: 14,
        color: '#666',
    },
});

export default TrackListItem;