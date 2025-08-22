
import React, { useRef } from 'react';
import { useMusicPlayer } from '../hooks/useMusicPlayer.tsx';
import { PlayIcon, PauseIcon, NextIcon, PrevIcon } from './IconComponents.tsx';

const MusicPlayer = ({ disabled }) => {
    const {
        currentSong,
        isPlaying,
        duration,
        currentTime,
        selectSong,
        togglePlayPause,
        seek,
    } = useMusicPlayer();
    
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            selectSong(file);
        }
    };

    const handleSelectFileClick = () => {
        fileInputRef.current?.click();
    };

    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds)) return '0:00';
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className={`space-y-4 transition-opacity duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div className="text-center">
                <p className="text-gray-400 text-sm">Now Playing</p>
                <p className="font-semibold text-lg truncate h-7 text-white">
                    {currentSong ? currentSong.name : 'No song selected'}
                </p>
            </div>

            <div className="space-y-2">
                <input
                    type="range"
                    min="0"
                    max={duration || 1}
                    value={currentTime}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="w-full h-2 bg-dark-accent rounded-lg appearance-none cursor-pointer accent-brand-blue"
                    disabled={disabled || !currentSong}
                />
                <div className="flex justify-between text-xs font-mono text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-6">
                <button className="text-gray-400 hover:text-white disabled:text-gray-600" disabled={disabled}>
                    <PrevIcon />
                </button>
                <button
                    onClick={togglePlayPause}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-blue text-white shadow-lg transform hover:scale-105 transition-transform disabled:bg-gray-600"
                    disabled={disabled || !currentSong}
                >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button className="text-gray-400 hover:text-white disabled:text-gray-600" disabled={disabled}>
                    <NextIcon />
                </button>
            </div>

            <div>
                <input
                    type="file"
                    accept="audio/mp3"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={disabled}
                />
                <button
                    onClick={handleSelectFileClick}
                    className="w-full bg-dark-accent hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-700 disabled:text-gray-500"
                    disabled={disabled}
                >
                    Select MP3 File
                </button>
            </div>
        </div>
    );
};

export default MusicPlayer;
