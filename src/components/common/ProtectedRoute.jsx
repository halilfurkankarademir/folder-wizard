import { Navigate } from "react-router-dom";
import { useApiKey } from "../../context/ApiKeyContext";
import { useTranslation } from "react-i18next";

export default function ProtectedRoute({ children }) {
    const { apiKey, loading } = useApiKey();

    const { t } = useTranslation();

    if (loading) {
        return <div className="p-4 text-center">{t("loading")}</div>;
    }

    if (!apiKey) {
        return <Navigate to="/setup" replace />;
    }

    return children;
}
