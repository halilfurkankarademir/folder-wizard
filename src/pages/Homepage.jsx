import { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MagicBackground from "../components/effects";
import RoundedButton from "../components/ui/buttons/RoundedButton";
import { useTranslation } from "react-i18next";

export default function Homepage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [canMakeRequest, setCanMakeRequest] = useState(true);
    const [showApiKeyModal, setShowApiKeyModal] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const openFolderDialog = async () => {
        if (window.electronAPI) {
            setLoading(true);
            const response = await window.electronAPI.invoke(
                "open-folder-dialog"
            );
            if (response.success) {
                navigate("/selected", {
                    state: {
                        path: response.path,
                        files: response.data,
                    },
                });
            }
        }
    };

    // Get API key from storage if it exists
    const getApiKeyFromStorage = async () => {
        const storedApiKey = await window.electronAPI.invoke("get-api-key");
        if (!storedApiKey) {
            setError(t("errors.apiKeyNotFound"));
            setCanMakeRequest(false);
            setShowApiKeyModal(true);
        }
    };

    useEffect(() => {
        getApiKeyFromStorage();
    }, []);

    return (
        <div className="w-full h-screen bg-neutral-950 text-white flex flex-col justify-center items-center relative overflow-hidden">
            {/* Büyülü Arkaplan Efektleri */}
            <MagicBackground />

            {/* Ana İçerik */}
            <div className="z-10 text-center px-10 max-w-md">
                {/* Logo */}
                <div className="mb-6">
                    <h1
                        className="text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400 leading-24"
                        style={{ fontFamily: "Henny Penny" }}
                    >
                        Folder Wizard
                    </h1>
                    <p className="text-zinc-400 text-sm">
                        {t("homepage.subtitle")}
                    </p>
                </div>

                <div className="space-y-4">
                    <RoundedButton
                        hasClicked={loading}
                        onClick={openFolderDialog}
                    />

                    <button
                        onClick={() => navigate("/settings")}
                        className="text-zinc-400 hover:text-purple-400 transition-colors flex items-center justify-center gap-2 mx-auto mt-6"
                    >
                        <FaCog className="w-4 h-4" />
                        <span className="text-sm">{t("settings.title")}</span>
                    </button>
                </div>

                {error && (
                    <p className="mt-8 text-red-500 text-sm font-semibold">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}
