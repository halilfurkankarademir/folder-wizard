import { Navigate } from "react-router-dom";
import { useApiKey } from "../../context/ApiKeyContext";

export default function ProtectedRoute({ children }) {
    const { apiKey, loading } = useApiKey();

    if (loading) {
        return <div className="p-4 text-center">Yükleniyor...</div>;
    }

    if (!apiKey) {
        return <Navigate to="/setup" replace />;
    }

    return children;
}
