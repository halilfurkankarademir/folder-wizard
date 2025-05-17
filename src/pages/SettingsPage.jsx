import { useState } from "react";
import { useTranslation } from "react-i18next";
import MagicBackground from "../components/effects";
import { useLanguage } from "../context/LanguageContex";

const SettingsPage = () => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);

    const { setActiveLanguage } = useLanguage();

    const handleLanguageChange = (newLang) => {
        setLanguage(newLang);
        setActiveLanguage(newLang);
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center">
            <MagicBackground />
            <div className="container mx-auto max-w-7xl p-4 md:p-8 pt-16 pb-12">
                <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-6 max-w-2xl mx-auto">
                    <h1 className="text-2xl font-light mb-6">
                        {t("settings.title")}
                    </h1>

                    {/* Dil Ayarları */}
                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-3">
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

                    {/* Uygulama Bilgileri */}
                    <div>
                        <h2 className="text-lg font-medium mb-3">
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
