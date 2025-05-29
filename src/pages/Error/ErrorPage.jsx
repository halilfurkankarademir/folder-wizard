import MagicBackground from "../../components/effects";
import PrimaryButton from "../../components/ui/buttons/PrimaryButton";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";

const ErrorPage = () => {
    const { t } = useTranslation();

    const goToHomepage = useCallback(() => {
        window.location.href = "#/";
        window.location.reload();
    }, []);

    return (
        <>
            <MagicBackground />
            <div className="w-full h-screen bg-neutral-950 text-white flex flex-col justify-center items-center text-center relative px-4">
                <FaExclamationTriangle className="text-yellow-500 text-6xl mb-6 animate-bounce" />
                <h1 className="text-3xl font-bold mb-8">
                    {t("errors.somethingWentWrong")}
                </h1>
                <PrimaryButton
                    buttonIcon={FaHome}
                    onClick={goToHomepage}
                    buttonTxt={t("backToHomepage")}
                />
            </div>
        </>
    );
};

export default memo(ErrorPage);
