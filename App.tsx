
import React from 'react';
import { BluetoothProvider, useBluetooth } from './hooks/useBluetooth.tsx';
import { MusicPlayerProvider } from './hooks/useMusicPlayer.tsx';
import Header from './components/Header.tsx';
import BluetoothManager from './components/BluetoothManager.tsx';
import MusicPlayer from './components/MusicPlayer.tsx';
import FrequencyControl from './components/FrequencyControl.tsx';

const AppContent = () => {
    const { isConnected } = useBluetooth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md mx-auto space-y-6">
                <Header />
                <div className="bg-dark-card rounded-xl shadow-lg p-6 space-y-6">
                    <BluetoothManager />
                    <MusicPlayer disabled={!isConnected} />
                    <FrequencyControl disabled={!isConnected} />
                </div>
                <footer className="text-center text-xs text-gray-500">
                    <p>Designed for conceptual FM Transmitter hardware.</p>
                </footer>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <BluetoothProvider>
            <MusicPlayerProvider>
                <AppContent />
            </MusicPlayerProvider>
        </BluetoothProvider>
    );
};

export default App;
