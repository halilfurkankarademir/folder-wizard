import { Navigate } from "react-router-dom";
import { useApiKey } from "../../context/ApiKeyContext";
import { useTranslation } from "react-i18next";
import { useNetworkContext } from "../../context/NetworkContext";

export default function ProtectedRoute({ children }) {
    const { apiKey, loading: apiLoading } = useApiKey();
    const { isConnected, loading: networkLoading } = useNetworkContext();

    console.log(isConnected);

    const { t } = useTranslation();

    if (apiLoading || networkLoading) {
        return <div className="p-4 text-center">{t("loading")}</div>;
    }

    // Return no network page if application is not connected to the internet
    if (!isConnected) {
        console.error("No network connection");
        return <Navigate to="/no-network" replace />;
    }

    // Return setup page if API key is not set
    if (!apiKey) {
        return <Navigate to="/setup" replace />;
    }

    return children;
}
