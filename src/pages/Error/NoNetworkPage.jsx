import { FaWifi, FaRedo } from "react-icons/fa";
import MagicBackground from "../../components/effects";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/images/logo.png";
import SecondaryButton from "../../components/ui/buttons/SecondaryButton";

export default function NoNetworkPage() {
    const { t } = useTranslation();

    const handleRetry = () => {
        window.location.href = "#/";
        window.location.reload();
    };

    return (
        <div className="w-full h-screen bg-neutral-950 text-white flex flex-col justify-center items-center relative py-96 px-36">
            <MagicBackground />
            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-3xl py-12 px-8 max-w-3xl shadow-xl text-center">
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Logo" className="w-20 h-20" />
                </div>

                <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                    <FaWifi className="text-red-500" />
                    {t("noNetworkPage.title") || "İnternet Bağlantısı Yok"}
                </h1>

                <p className="text-zinc-300 mb-6 leading-relaxed text-left">
                    {t("noNetworkPage.description") ||
                        "Uygulama internete bağlanamadı. Lütfen bağlantınızı kontrol edip tekrar deneyin."}
                </p>

                <div className="flex justify-center">
                    <SecondaryButton
                        buttonIcon={FaRedo}
                        buttonTxt={
                            t("noNetworkPage.retryButton") || "Tekrar Dene"
                        }
                        onClick={handleRetry}
                    />
                </div>

                <small className="text-zinc-500 block mt-6">
                    {t("noNetworkPage.note") ||
                        "Bu sayfa yalnızca çevrimdışı durumlarda görüntülenir."}
                </small>
            </div>
        </div>
    );
}
