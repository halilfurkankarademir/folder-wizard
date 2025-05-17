import { useState, useEffect } from "react";
import { FaFolder, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MagicBackground from "../components/effects";
import RoundedButton from "../components/ui/buttons/RoundedButton";

export default function Homepage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const openFolderDialog = () => {
        if (window.electronAPI?.openFolderDialog) {
            setLoading(true);
            window.electronAPI.openFolderDialog();
        }
    };

    useEffect(() => {
        if (window.electronAPI) {
            const handleResponse = (response) => {
                setLoading(false);
                if (response.success && response.data) {
                    navigate("/selected", {
                        state: {
                            path: response.path,
                            files: response.data,
                        },
                    });
                }
            };
            window.electronAPI.receive(
                "folder-dialog-response",
                handleResponse
            );
        }
    }, [navigate]);

    return (
        <div className="w-full h-screen bg-neutral-950 text-white flex flex-col justify-center items-center relative overflow-hidden">
            {/* Büyülü Arkaplan Efektleri */}
            <MagicBackground />

            {/* Ana İçerik */}
            <div className="z-10 text-center px-10 max-w-md">
                {/* Logo */}
                <div className="mb-10">
                    <h1
                        className="text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400 leading-24"
                        style={{ fontFamily: "Henny Penny" }}
                    >
                        Folder Wizard
                    </h1>
                    <p className="text-zinc-400  text-sm">
                        Dosyalarınızı sihirle organize edin
                    </p>
                </div>

                <RoundedButton
                    hasClicked={loading}
                    onClick={openFolderDialog}
                />

                <p className="mt-10 text-xs text-zinc-500">
                    Tüm dosya işlemleri yerel olarak gerçekleştirilir
                </p>
            </div>
        </div>
    );
}
