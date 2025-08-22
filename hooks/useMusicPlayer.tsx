
import React, { useState, useRef, useCallback, useEffect, createContext, useContext } from 'react';

const MusicPlayerContext = createContext(undefined);

export const MusicPlayerProvider = ({ children }) => {
    const audioRef = useRef(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const selectSong = useCallback((file) => {
        if (currentSong?.url) {
            URL.revokeObjectURL(currentSong.url);
        }
        const url = URL.createObjectURL(file);
        setCurrentSong({ name: file.name, url });
        setIsPlaying(false);
    }, [currentSong]);

    const togglePlayPause = useCallback(() => {
        if (!currentSong) return;
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play().catch(error => console.error("Error playing audio:", error));
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying, currentSong]);

    const seek = useCallback((time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }, []);

    const onTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };
    
    const onLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const onEnded = () => {
        setIsPlaying(false);
        // Here you would add logic to play the next song in a playlist
    };
    
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('timeupdate', onTimeUpdate);
            audio.addEventListener('loadedmetadata', onLoadedMetadata);
            audio.addEventListener('ended', onEnded);
            
            if (currentSong?.url) {
                audio.src = currentSong.url;
                audio.load();
                // We will attempt to play, but catch errors silently if autoplay is blocked.
                // The user can then press play manually.
                audio.play().then(() => setIsPlaying(true)).catch(e => {
                    setIsPlaying(false);
                    console.log("Autoplay was prevented.", e);
                });
            }
        }
        return () => {
            if (audio) {
                audio.removeEventListener('timeupdate', onTimeUpdate);
                audio.removeEventListener('loadedmetadata', onLoadedMetadata);
                audio.removeEventListener('ended', onEnded);
            }
        };
    }, [currentSong]);
    
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    
    const value = {
        audioRef,
        currentSong,
        isPlaying,
        progress,
        duration,
        currentTime,
        selectSong,
        togglePlayPause,
        seek,
    };

    return (
        <MusicPlayerContext.Provider value={value}>
            {children}
            <audio ref={audioRef} />
        </MusicPlayerContext.Provider>
    );
};

export const useMusicPlayer = () => {
    const context = useContext(MusicPlayerContext);
    if (context === undefined) {
        throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
    }
    return context;
};
