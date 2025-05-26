import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MagicBackground from "../../components/effects";
import { useLanguage } from "../../context/LanguageContext";
import { useBgAnimation } from "../../context/BgAnimationContext";
import { useApiKey } from "../../context/ApiKeyContext";
import { FaLanguage, FaPaintBrush, FaKey, FaInfoCircle } from "react-icons/fa";

const SettingsPage = () => {
    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState(i18n.language);
    const [animatedBackground, setAnimatedBackground] = useState(true);
    const [apiKeyInput, setApiKeyInput] = useState("");
    const [savedMessage, setSavedMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [storedApiKeyExists, setStoredApiKeyExists] = useState(false);

    const { setActiveLanguage } = useLanguage();
    const { setIsBgAnimationActive } = useBgAnimation();
    const { setApiKey } = useApiKey();

    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);
        setActiveLanguage(newLang);
        i18n.changeLanguage(newLang);
    };

    const handleChangeBackgroundAnimation = (newValue) => {
        localStorage.setItem("animatedBackground", newValue);
        setAnimatedBackground(newValue);
        setIsBgAnimationActive(newValue);
    };

    const handleSaveApiKey = async () => {
        setErrorMessage("");
        setSavedMessage("");
        if (!apiKeyInput.trim()) {
            setErrorMessage(t("settings.apiKeyEmptyError"));
            return;
        }

        try {
            const response = await window.electronAPI?.invoke(
                "set-api-key",
                apiKeyInput.trim()
            );
            if (response.error) {
                setErrorMessage(t("settings.apiKeyInvalidError"));
                return;
            }
            setSavedMessage(t("settings.apiKeySavedSuccess"));
            setStoredApiKeyExists(true);
            setApiKey(apiKeyInput.trim());
            setApiKeyInput("");
            setTimeout(() => setSavedMessage(""), 3000);
        } catch (err) {
            setErrorMessage(t("settings.apiKeySaveUnexpectedError"));
            console.error(err);
        }
    };

    const handleDeleteApiKey = async () => {
        try {
            const response = await window.electronAPI?.invoke("delete-api-key");
            if (!response.success) {
                setErrorMessage(t("settings.apiKeyDeleteError"));
            }
            setApiKey("");
            setApiKeyInput("");
            setStoredApiKeyExists(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getApiKeyFromStorage = async () => {
        const stored = await window.electronAPI.invoke("get-api-key");
        if (stored) {
            setApiKeyInput(stored);
            setStoredApiKeyExists(true);
        }
    };

    useEffect(() => {
        const storedBackground = localStorage.getItem("animatedBackground");
        if (storedBackground) {
            setAnimatedBackground(storedBackground === "true");
        }
        getApiKeyFromStorage();
    }, []);

    return (
        <div className="w-full min-h-screen p-12 bg-neutral-950 text-white flex flex-col justify-center items-center">
            <MagicBackground />
            <div className="container mx-auto max-w-7xl p-4 md:p-8 pt-16 pb-12">
                <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-6 max-w-2xl mx-auto">
                    <h1 className="text-2xl font-light mb-6">
                        {t("settings.title")}
                    </h1>

                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
                            <FaLanguage className="text-purple-400" />
                            {t("settings.language")}
                        </h2>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleLanguageChange("tr")}
                                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                    language === "tr"
                                        ? "bg-purple-600 text-white"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                }`}
                            >
                                Türkçe
                            </button>
                            <button
                                onClick={() => handleLanguageChange("en")}
                                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                    language === "en"
                                        ? "bg-purple-600 text-white"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                }`}
                            >
                                English
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
                            <FaPaintBrush className="text-purple-400" />
                            {t("settings.backgroundAnimation")}
                        </h2>
                        <div className="flex gap-3">
                            <button
                                onClick={() =>
                                    handleChangeBackgroundAnimation(true)
                                }
                                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                    animatedBackground === true
                                        ? "bg-purple-600 text-white"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                }`}
                            >
                                {t("settings.on")}
                            </button>
                            <button
                                onClick={() =>
                                    handleChangeBackgroundAnimation(false)
                                }
                                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                    animatedBackground === false
                                        ? "bg-purple-600 text-white"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                }`}
                            >
                                {t("settings.off")}
                            </button>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
                            <FaKey className="text-purple-400" />
                            {t("settings.geminiApiKey")}
                        </h2>
                        <div className="flex gap-3 items-center">
                            <input
                                type="text"
                                value={apiKeyInput}
                                onChange={(e) => setApiKeyInput(e.target.value)}
                                placeholder="Gemini API Key"
                                className="bg-zinc-800 text-white px-4 py-2 rounded-lg w-full"
                                autoComplete="off"
                            />
                            <button
                                onClick={handleSaveApiKey}
                                className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                            >
                                {t("settings.save")}
                            </button>
                            <button
                                onClick={handleDeleteApiKey}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                            >
                                {t("settings.delete")}
                            </button>
                        </div>
                        {storedApiKeyExists && !apiKeyInput && (
                            <p className="text-sm text-zinc-400 mt-1">
                                {t("settings.apiKeyExistsMessage")}
                            </p>
                        )}
                        {savedMessage && (
                            <p className="text-sm text-green-400 mt-2">
                                {savedMessage}
                            </p>
                        )}
                        {errorMessage && (
                            <p className="text-sm text-red-500 mt-2">
                                {errorMessage}
                            </p>
                        )}
                    </div>

                    <div>
                        <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
                            <FaInfoCircle className="text-purple-400" />
                            {t("settings.about")}
                        </h2>
                        <div className="bg-zinc-800/50 rounded-lg p-4">
                            <p className="text-sm text-zinc-400">
                                Folder Wizard v1.0.0
                            </p>
                            <p className="text-sm text-zinc-400 mt-1">
                                {t("settings.copyright")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
