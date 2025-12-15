import React, { useEffect, useState } from 'react';
import { View, Text, Button, Slider } from 'react-native';
import { Audio } from 'expo-av';
import { useAudioService } from '../services/audioService';

const MobilePlayer = ({ track }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioService = useAudioService();

    useEffect(() => {
        const loadAudio = async () => {
            await audioService.loadAudio(track.url);
            const status = await audioService.getStatus();
            setDuration(status.durationMillis);
        };

        loadAudio();

        return () => {
            audioService.unloadAudio();
        };
    }, [track]);

    const handlePlayPause = async () => {
        if (isPlaying) {
            await audioService.pauseAudio();
        } else {
            await audioService.playAudio();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = async (value) => {
        await audioService.seekAudio(value);
        setPosition(value);
    };

    useEffect(() => {
        const updatePosition = async () => {
            const currentPosition = await audioService.getPosition();
            setPosition(currentPosition);
        };

        const interval = setInterval(updatePosition, 1000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <View>
            <Text>{track.title}</Text>
            <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
            <Slider
                value={position}
                minimumValue={0}
                maximumValue={duration}
                onValueChange={handleSeek}
            />
            <Text>{`${Math.floor(position / 1000)} / ${Math.floor(duration / 1000)} seconds`}</Text>
        </View>
    );
};

export default MobilePlayer;