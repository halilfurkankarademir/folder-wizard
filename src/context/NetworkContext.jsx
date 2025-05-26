import { createContext, useContext, useEffect, useState } from "react";

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkConnection = async () => {
        try {
            setLoading(true);
            const result = await window.electronAPI.invoke(
                "check-network-connection"
            );
            setIsConnected(result);
        } catch (error) {
            console.error("Network check failed:", error);
            setIsConnected(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkConnection();

        // Check connection every 15 seconds
        const interval = setInterval(checkConnection, 15000);

        return () => clearInterval(interval);
    }, []);

    return (
        <NetworkContext.Provider value={{ isConnected, loading }}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetworkContext = () => useContext(NetworkContext);
