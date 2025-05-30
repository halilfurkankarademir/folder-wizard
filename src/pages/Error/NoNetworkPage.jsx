import { FaWifi, FaRedo } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/images/logo.png";
import SecondaryButton from "../../components/ui/buttons/SecondaryButton";
import { memo, useCallback } from "react";

const NoNetworkPage = () => {
    const { t } = useTranslation();

    const handleRetry = useCallback(() => {
        window.location.href = "#/";
        window.location.reload();
    }, []);

    return (
        <div className="w-full h-screen bg-black text-white flex flex-col justify-center items-center relative py-96 px-36">
            <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-3xl py-12 px-8 max-w-3xl shadow-xl text-center">
                <div className="flex justify-center mb-6">
                    <img src={Logo} alt="Logo" className="w-20 h-20" />
                </div>

                <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                    <FaWifi className="text-red-500" />
                    {t("noNetworkPage.title")}
                </h1>

                <p className="text-zinc-300 mb-6 leading-relaxed text-left">
                    {t("noNetworkPage.description")}
                </p>

                <div className="flex justify-center">
                    <SecondaryButton
                        buttonIcon={FaRedo}
                        buttonTxt={t("noNetworkPage.retryButton")}
                        onClick={handleRetry}
                    />
                </div>

                <small className="text-zinc-500 block mt-6">
                    {t("noNetworkPage.note")}
                </small>
            </div>
        </div>
    );
};

export default memo(NoNetworkPage);
