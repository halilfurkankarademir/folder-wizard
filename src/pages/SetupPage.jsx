import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";
import MagicBackground from "../components/effects";
import { useTranslation } from "react-i18next";
import Logo from "../assets/images/logo.png";

export default function SetupPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClickLink = async () => {
        const response = await window.electronAPI?.invoke(
            "open-link",
            "https://ai.google.dev/gemini-api/docs/api-key"
        );
        console.log(response);
    };

    return (
        <div className="w-full h-screen bg-neutral-950 text-white flex flex-col justify-center items-center relative overflow-hidden p-6">
            <MagicBackground />

            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 max-w-lg w-full shadow-xl text-center">
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="" className="w-20 h-20" />
                </div>

                <h1 className="text-3xl font-bold mb-4">
                    {t("setupPage.title")}
                </h1>

                <p className="text-zinc-300 mb-4 leading-relaxed text-left">
                    {t("setupPage.description1")}
                </p>
                <p className="text-zinc-300 mb-4 leading-relaxed text-left">
                    {t("setupPage.description2")}
                </p>
                <p className="text-zinc-300 mb-6 leading-relaxed text-left">
                    {t("setupPage.description3")}
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                    <button
                        onClick={handleClickLink}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-medium flex items-center justify-center gap-2 transition-all duration-300"
                    >
                        <FaBookOpen />
                        <span>{t("setupPage.tutorialButton")}</span>
                    </button>

                    <button
                        onClick={() => navigate("/settings")}
                        className="px-6 py-3 border border-purple-600 hover:border-purple-500 rounded-full text-purple-400 hover:text-purple-300 font-medium transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <span>{t("setupPage.settingsButton")}</span>
                        <FaArrowRight />
                    </button>
                </div>

                <small className="text-zinc-500 block">
                    {t("setupPage.note")}
                </small>
            </div>
        </div>
    );
}
