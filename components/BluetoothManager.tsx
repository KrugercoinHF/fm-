
import React from 'react';
import { useBluetooth } from '../hooks/useBluetooth.tsx';

const BluetoothManager = () => {
    const { isConnected, device, connect, disconnect, isLoading } = useBluetooth();

    return (
        <div className="flex items-center justify-between p-4 bg-dark-accent rounded-lg">
            <div>
                <p className="font-semibold text-lg text-white">Transmitter Status</p>
                <p className={`text-sm ${isConnected ? 'text-green-400' : 'text-gray-400'}`}>
                    {isConnected ? `Connected to ${device?.name || 'Unknown Device'}` : 'Disconnected'}
                </p>
            </div>
            {isConnected ? (
                <button
                    onClick={disconnect}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Disconnect
                </button>
            ) : (
                <button
                    onClick={connect}
                    disabled={isLoading}
                    className="bg-brand-blue hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Connecting...' : 'Connect'}
                </button>
            )}
        </div>
    );
};

export default BluetoothManager;
