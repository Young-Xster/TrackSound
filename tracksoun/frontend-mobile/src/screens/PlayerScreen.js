import React, { useEffect, useState } from 'react';
import { View, Text, Button, Slider } from 'react-native';
import { Audio } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import { downloadTrack } from '../services/offlineStorage';

const PlayerScreen = () => {
    const route = useRoute();
    const { track } = route.params; // Expecting track data passed from previous screen
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPosition, setPlaybackPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        loadAudio();
        return () => {
            unloadAudio();
        };
    }, [track]);

    const loadAudio = async () => {
        const { sound: playbackSound, status } = await Audio.Sound.createAsync(
            { uri: track.audioUrl },
            { shouldPlay: isPlaying }
        );
        setSound(playbackSound);
        setDuration(status.durationMillis);
        playbackSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    };

    const unloadAudio = async () => {
        if (sound) {
            await sound.unloadAsync();
        }
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setPlaybackPosition(status.positionMillis);
            setIsPlaying(status.isPlaying);
        }
    };

    const playPause = async () => {
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    const seek = async (value) => {
        const newPosition = value * duration;
        await sound.setPositionAsync(newPosition);
    };

    const handleDownload = async () => {
        await downloadTrack(track);
    };

    return (
        <View>
            <Text>{track.title}</Text>
            <Text>{track.artist}</Text>
            <Button title={isPlaying ? "Pause" : "Play"} onPress={playPause} />
            <Slider
                value={playbackPosition / duration}
                onValueChange={seek}
                minimumValue={0}
                maximumValue={1}
            />
            <Button title="Download" onPress={handleDownload} />
        </View>
    );
};

export default PlayerScreen;