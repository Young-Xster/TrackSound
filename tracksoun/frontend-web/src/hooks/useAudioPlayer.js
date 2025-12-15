import { useState, useEffect, useRef } from 'react';

const useAudioPlayer = (initialTrack) => {
    const [track, setTrack] = useState(initialTrack);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(new Audio(track?.url));

    useEffect(() => {
        audioRef.current.src = track?.url;

        const handleTimeUpdate = () => {
            setCurrentTime(audioRef.current.currentTime);
        };

        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [track]);

    const play = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const skipTo = (time) => {
        audioRef.current.currentTime = time;
    };

    const stop = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    };

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            audioRef.current.src = '';
        };
    }, []);

    return {
        track,
        isPlaying,
        currentTime,
        play,
        pause,
        skipTo,
        stop,
        setTrack,
    };
};

export default useAudioPlayer;