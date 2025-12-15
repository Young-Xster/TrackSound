import React, { createContext, useContext, useState, useEffect } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackTime, setPlaybackTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [queue, setQueue] = useState([]);

    const playTrack = (track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
        // Logic to play the track using audio API
    };

    const pauseTrack = () => {
        setIsPlaying(false);
        // Logic to pause the track
    };

    const stopTrack = () => {
        setIsPlaying(false);
        setPlaybackTime(0);
        // Logic to stop the track
    };

    const nextTrack = () => {
        const nextIndex = (queue.indexOf(currentTrack) + 1) % queue.length;
        playTrack(queue[nextIndex]);
    };

    const previousTrack = () => {
        const prevIndex = (queue.indexOf(currentTrack) - 1 + queue.length) % queue.length;
        playTrack(queue[prevIndex]);
    };

    const seekTrack = (time) => {
        setPlaybackTime(time);
        // Logic to seek to a specific time in the track
    };

    useEffect(() => {
        // Logic to update playback time and duration
        const interval = setInterval(() => {
            if (isPlaying) {
                setPlaybackTime((prevTime) => prevTime + 1); // Update playback time
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <PlayerContext.Provider value={{
            currentTrack,
            isPlaying,
            playbackTime,
            duration,
            queue,
            playTrack,
            pauseTrack,
            stopTrack,
            nextTrack,
            previousTrack,
            seekTrack,
            setQueue,
            setDuration,
        }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    return useContext(PlayerContext);
};