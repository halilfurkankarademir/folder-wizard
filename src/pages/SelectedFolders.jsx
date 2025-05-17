import { useState, useEffect } from "react";
import { FaFile, FaArrowLeft, FaMagic, FaArrowRight } from "react-icons/fa";
import { getFileIcon } from "../utils/helpers";
import getResponseFromAI from "../services/aiService";
import { useLocation, useNavigate } from "react-router-dom";
import prompts from "../utils/constans/prompts";
import MagicBackground from "../components/effects";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContex";

export default function SelectedFolders() {
    const { t } = useTranslation();
    const { state } = useLocation();
    const navigate = useNavigate();

    const { path, files } = state || {};

    const [error, setError] = useState(null);
    const [newFiles, setNewFiles] = useState([]);
    const [analyzing, setAnalyzing] = useState(true);

    const { activeLanguage } = useLanguage();

    if (!path || !files) {
        return (
            <div className="w-full h-screen bg-neutral-950 text-white flex flex-col justify-center items-center ">
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 max-w-md">
                    <p className="text-center text-lg mb-4 text-zinc-300">
                        {t("selectedFoldersPage.unauthorizedAccess")}
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-300 flex items-center justify-center gap-2 mx-auto font-medium"
                    >
                        <FaArrowLeft />
                        <span>{t("selectedFoldersPage.backToHomepage")}</span>
                    </button>
                </div>
            </div>
        );
    }

    const analyzeWithAI = async () => {
        try {
            console.log(activeLanguage);
            const prompt = prompts[activeLanguage];
            const newFoldersData = await getResponseFromAI(
                `${prompt} ${JSON.stringify(files)}`
            );
            if (newFoldersData) {
                setNewFiles(newFoldersData);
                setAnalyzing(false);
            }
        } catch (err) {
            setError(t("errors.aiAnalyzerError"));
            setAnalyzing(false);
        }
    };

    const handleAnalyzeButton = () => {
        if (newFiles.length > 0) {
            navigate("/suggested", {
                state: { suggestedFileOrg: newFiles, currentPath: path },
            });
        }
    };

    useEffect(() => {
        analyzeWithAI();
    }, []);

    return (
        <div className="w-full min-h-screen  bg-neutral-950 text-white flex flex-col justify-center items-center">
            {analyzing ? (
                <div className="w-full h-screen flex flex-col justify-center items-center text-white">
                    <MagicBackground />
                    <FaMagic className="animate-spin text-3xl mb-4 text-purple-500" />
                    <h2 className="text-xl font-light animate-pulse">
                        {t("selectedFoldersPage.analyzingFiles")}
                    </h2>
                </div>
            ) : (
                <div className="container mx-auto max-w-7xl p-4 md:p-8 pt-16">
                    <MagicBackground />
                    {/* Header */}
                    <div className="mt-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="mb-4">
                                <h1 className="text-2xl md:text-3xl font-light mb-2">
                                    {t("selectedFoldersPage.selectedFolder")}
                                </h1>
                                <p className="text-zinc-500 font-mono text-sm bg-zinc-900/50 p-2 rounded-lg border border-zinc-800">
                                    {path}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleAnalyzeButton}
                                    disabled={analyzing}
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-300 flex items-center gap-2 font-medium"
                                >
                                    {analyzing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>
                                                {t(
                                                    "selectedFoldersPage.processing"
                                                )}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <FaArrowRight />
                                            <span>
                                                {t(
                                                    "selectedFoldersPage.showSuggestions"
                                                )}
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-900/20 border border-red-800/30 rounded-lg text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Files List */}
                    <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-4 mb-6">
                        <div className="flex items-center mb-4">
                            <h2 className="text-xl font-light">
                                {t("selectedFoldersPage.filesInFolder")}
                            </h2>
                            <span className="ml-2 px-2 py-0.5 bg-zinc-800 rounded-full text-sm border border-zinc-700">
                                {files.length}
                            </span>
                        </div>

                        {files.length === 0 ? (
                            <p className="text-zinc-500 italic">
                                {t("errors.fileNotFound")}
                            </p>
                        ) : (
                            <div className="max-h-[calc(100vh-350px)] overflow-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                                <FileList files={files} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function FileList({ files }) {
    // Dosya isminden uzantıyı ayırma fonksiyonu
    const getFileNameAndExtension = (fileName) => {
        const lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex === -1 || lastDotIndex === 0) {
            return { name: fileName, extension: "" };
        }
        return {
            name: fileName.substring(0, lastDotIndex),
            extension: fileName.substring(lastDotIndex),
        };
    };

    return (
        <div className="space-y-2">
            {files.map((file, index) => {
                const IconComponent = getFileIcon(file.name) || FaFile;
                const { name, extension } = getFileNameAndExtension(file.name);

                return (
                    <div
                        key={index}
                        className="flex items-center p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/30 hover:bg-zinc-800 transition-colors duration-150"
                    >
                        <span className="w-8 h-8 flex items-center justify-center bg-purple-600/30 rounded-full text-purple-300">
                            <IconComponent />
                        </span>
                        <div className="ml-3 truncate flex-1">
                            <div className="flex items-center">
                                <span className="text-sm text-zinc-300">
                                    {name}
                                </span>
                                {extension && (
                                    <span className="text-xs text-zinc-400 ml-1">
                                        {extension}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
