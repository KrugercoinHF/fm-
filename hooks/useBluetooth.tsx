
import React, { useState, useCallback, useContext, createContext } from 'react';

const BluetoothContext = createContext(undefined);

export const BluetoothProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [device, setDevice] = useState(null);

    const connect = useCallback(() => {
        setIsLoading(true);
        console.log('Attempting to connect to Bluetooth device...');
        // Mocking Web Bluetooth API call
        setTimeout(() => {
            const mockDevice = { id: '00:11:22:33:FF:EE', name: 'FM-Transmitter-X1' };
            setDevice(mockDevice);
            setIsConnected(true);
            setIsLoading(false);
            console.log('Successfully connected to mock device:', mockDevice.name);
        }, 2000);
    }, []);

    const disconnect = useCallback(() => {
        setIsConnected(false);
        setDevice(null);
        console.log('Disconnected from Bluetooth device.');
    }, []);

    const sendCommand = useCallback((command) => {
        return new Promise<void>((resolve, reject) => {
            if (!isConnected) {
                console.error('Send command failed: No device connected.');
                return reject(new Error('Device not connected'));
            }
            console.log(`Sending command to ${device?.name}: ${command}`);
            // Mocking sending data over Bluetooth
            setTimeout(() => {
                console.log('Command acknowledged.');
                resolve();
            }, 500);
        });
    }, [isConnected, device]);

    const value = { isConnected, isLoading, device, connect, disconnect, sendCommand };

    return <BluetoothContext.Provider value={value}>{children}</BluetoothContext.Provider>;
};

export const useBluetooth = () => {
    const context = useContext(BluetoothContext);
    if (context === undefined) {
        throw new Error('useBluetooth must be used within a BluetoothProvider');
    }
    return context;
};
