
import React, { useState, useEffect } from 'react';
import { useBluetooth } from '../hooks/useBluetooth.tsx';

const FrequencyControl = ({ disabled }) => {
    const [frequency, setFrequency] = useState(99.5);
    const { sendCommand } = useBluetooth();
    const [isSending, setIsSending] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    useEffect(() => {
        if (disabled) {
            setFeedbackMessage('');
            setIsSending(false);
        }
    }, [disabled]);

    const handleSetFrequency = () => {
        if (disabled) return;
        setIsSending(true);
        setFeedbackMessage('');
        
        sendCommand(`FREQ:${frequency.toFixed(1)}`)
            .then(() => {
                setFeedbackMessage(`Frequency set to ${frequency.toFixed(1)} MHz`);
            })
            .catch((err) => {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                setFeedbackMessage(`Error: ${errorMessage}`);
            })
            .finally(() => {
                setIsSending(false);
                setTimeout(() => setFeedbackMessage(''), 3000);
            });
    };

    return (
        <div className={`space-y-4 transition-opacity duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <label htmlFor="frequency-slider" className="block text-center text-gray-400">
                Broadcast Frequency
            </label>
            <div className="flex items-center space-x-4">
                <input
                    id="frequency-slider"
                    type="range"
                    min="87.5"
                    max="108.0"
                    step="0.1"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="w-full h-2 bg-dark-accent rounded-lg appearance-none cursor-pointer accent-brand-blue"
                    disabled={disabled}
                />
                <div className="w-24 text-center font-mono text-lg bg-dark-bg p-2 rounded-md text-white">
                    {frequency.toFixed(1)}
                </div>
            </div>
            <button
                onClick={handleSetFrequency}
                className="w-full bg-dark-accent hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-700 disabled:text-gray-500"
                disabled={disabled || isSending}
            >
                {isSending ? 'Sending...' : 'Set Frequency'}
            </button>
            {<p className="text-center text-sm text-brand-blue h-4">{feedbackMessage}&nbsp;</p>}
        </div>
    );
};

export default FrequencyControl;
