import React, { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const AudioPlayer = () => {
    const { currentTrack, isPlaying, togglePlay, nextTrack, previousTrack, setCurrentTime, currentTime } = useContext(PlayerContext);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleSeek = (event) => {
        const seekTime = event.target.value;
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
        }
    };

    return (
        <div className="audio-player">
            <audio
                ref={audioRef}
                src={currentTrack?.url}
                onTimeUpdate={handleTimeUpdate}
                onEnded={nextTrack}
            />
            <div className="controls">
                <button onClick={previousTrack}>Previous</button>
                <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
                <button onClick={nextTrack}>Next</button>
            </div>
            <input
                type="range"
                min="0"
                max={currentTrack?.duration || 0}
                value={currentTime}
                onChange={handleSeek}
            />
        </div>
    );
};

export default AudioPlayer;