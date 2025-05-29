import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFolder, FaCheck, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UndoButtonRenderer from "../../components/ui/renderers/UndoButtonRenderer";

const FoldersOrganising = () => {
    const [done, setDone] = useState(false);
    const [undoStatus, setUndoStatus] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClickUndo = useCallback(async () => {
        try {
            setUndoStatus("loading");
            const response = await window.electronAPI?.invoke(
                "undo-organisation"
            );
            setUndoStatus(response.success ? "success" : "error");
        } catch (error) {
            console.error(error);
            setUndoStatus("error");
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setDone(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center p-8">
            <div className="max-w-2xl w-full bg-neutral-900 rounded-2xl p-8 shadow-2xl border border-neutral-800">
                {!done ? (
                    <div className="flex flex-col items-center space-y-8">
                        <div className="relative">
                            <div className="text-purple-600 mb-8 flex items-center space-x-4">
                                <FaFolder className="text-7xl animate-bounce" />
                                <div className="flex space-x-3">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="text-purple-400 text-4xl animate-moveUpDown"
                                            style={{
                                                animationDelay: `${i * 0.3}s`,
                                            }}
                                        >
                                            📄
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-purple-600/20 rounded-full">
                                <div className="w-full h-full bg-purple-600 rounded-full animate-progress"></div>
                            </div>
                        </div>
                        <h2 className="text-xl font-light tracking-wide text-zinc-300 text-center">
                            {t("foldersOrganizing")}
                        </h2>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-6">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                            <FaCheck className="text-4xl text-green-400" />
                        </div>
                        <h2 className="text-2xl font-semibold text-green-400 tracking-wide text-center">
                            {t("organizationCompleted")}
                        </h2>
                        <div className="flex flex-col space-y-4 w-full max-w-xs">
                            {
                                <UndoButtonRenderer
                                    undoStatus={undoStatus}
                                    handleClickUndo={handleClickUndo}
                                    t={t}
                                />
                            }
                            <button
                                className="px-4 py-3 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                                onClick={() => navigate("/")}
                            >
                                <FaHome className="w-4 h-4" />
                                {t("backToHomepage")}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes moveUpDown {
                    0%, 100% { transform: translateY(0); opacity: 0.4; }
                    50% { transform: translateY(-20%); opacity: 1; }
                }
                .animate-moveUpDown {
                    animation: moveUpDown 1.2s ease-in-out infinite;
                }
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                .animate-progress {
                    animation: progress 3s linear forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default FoldersOrganising;
