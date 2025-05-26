import { useState, useEffect } from "react";
import { FaCog, FaFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MagicBackground from "../../components/effects";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/images/logo_color.png";
import PrimaryButton from "../../components/ui/buttons/PrimaryButton";

export default function Homepage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Opens folder dialog and navigates to selected folder if success
    const openFolderDialog = async () => {
        if (window.electronAPI) {
            setLoading(true);
            const response = await window.electronAPI.invoke(
                "open-folder-dialog"
            );
            if (response.success === false) {
                const errorMessage = t(`errors.${response.error}`);
                setError(errorMessage);
                setLoading(false);
                return;
            } else if (response.data.success === false) {
                const errorMessage = t(`errors.${response.data.error}`);
                setError(errorMessage);
                setLoading(false);
                return;
            }
            navigate("/selected", {
                state: {
                    path: response.path,
                    files: response.data,
                },
            });
        }
    };

    // Clears error message in 3 seconds after it appears
    useEffect(() => {
        setTimeout(() => {
            setError(null);
        }, 5000);
    }, [error]);

    return (
        <div className="w-full h-screen bg-neutral-950 text-white flex flex-col justify-center items-center relative overflow-hidden">
            <MagicBackground />
            <div className="z-10 text-center px-10 max-w-md">
                <div className="mb-6">
                    <img src={Logo} alt="" className="w-64 h-64 mx-auto " />
                    <p className="text-zinc-400 text-sm">
                        {t("homepage.subtitle")}
                    </p>
                </div>

                <div className="space-y-4">
                    <PrimaryButton
                        hasClicked={loading}
                        onClick={openFolderDialog}
                        buttonIcon={FaFolder}
                        buttonTxt={t("selectFolder")}
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
