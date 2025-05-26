import {
    useContext,
    createContext,
    useState,
    useEffect,
    useCallback,
} from "react";

const ApiKeyContext = createContext();

export const ApiKeyProvider = ({ children }) => {
    const [apiKey, setApiKey] = useState("");
    const [loading, setLoading] = useState(true);

    const getApiKey = useCallback(async () => {
        try {
            const stored = await window.electronAPI.invoke("get-api-key");
            if (stored) setApiKey(stored);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getApiKey();
    }, [getApiKey]);

    return (
        <ApiKeyContext.Provider
            value={{ apiKey, setApiKey, loading, refreshApiKey: getApiKey }}
        >
            {children}
        </ApiKeyContext.Provider>
    );
};

export const useApiKey = () => {
    const context = useContext(ApiKeyContext);
    if (!context) {
        throw new Error("useApiKey must be used within an ApiKeyProvider");
    }
    return context;
};
