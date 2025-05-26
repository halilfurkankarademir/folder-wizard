import { createContext, useContext, useEffect, useState } from "react";

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(null);
    const [loading, setLoading] = useState(true);

    const initialCheckConnection = async () => {
        setLoading(true);
        try {
            const result = await window.electronAPI.invoke(
                "check-network-connection"
            );
            setIsConnected(result);
        } catch (error) {
            console.error("Initial network check failed:", error);
            setIsConnected(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initialCheckConnection();
    }, []);

    return (
        <NetworkContext.Provider value={{ isConnected, loading }}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetworkContext = () => useContext(NetworkContext);
