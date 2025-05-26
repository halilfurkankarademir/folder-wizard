import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaCog } from "react-icons/fa";
import MagicBackground from "../../components/effects";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/images/logo.png";
import SecondaryButton from "../../components/ui/buttons/SecondaryButton";
import OutlineButton from "../../components/ui/buttons/OutlineButton";

export default function SetupPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClickTutorial = async () => {
        const response = await window.electronAPI?.invoke(
            "open-link",
            "https://ai.google.dev/gemini-api/docs/api-key"
        );
        console.log(response);
    };

    return (
        <div className="w-full h-screen bg-neutral-950 text-white flex flex-col justify-center items-center relative py-96 px-36">
            <MagicBackground />
            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-3xl py-12 px-8 max-w-3xl shadow-xl text-center">
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
                    <SecondaryButton
                        buttonIcon={FaBookOpen}
                        onClick={handleClickTutorial}
                        buttonTxt={t("setupPage.tutorialButton")}
                    />

                    <OutlineButton
                        buttonIcon={FaCog}
                        buttonTxt={t("setupPage.settingsButton")}
                        onClick={() => navigate("/settings")}
                    />
                </div>

                <small className="text-zinc-500 block">
                    {t("setupPage.note")}
                </small>
            </div>
        </div>
    );
}
