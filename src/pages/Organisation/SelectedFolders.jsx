import { useState, useEffect, useCallback } from "react";
import { FaMagic, FaArrowRight } from "react-icons/fa";
import getResponseFromAI from "../../services/aiService";
import { useLocation, useNavigate } from "react-router-dom";
import prompts from "../../utils/constants/prompts";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import FileListRenderer from "../../components/ui/renderers/FileListRenderer";

const SelectedFolders = () => {
    const { t } = useTranslation();
    const { state } = useLocation();
    const navigate = useNavigate();

    const { path, files } = state || {};

    const [error, setError] = useState(null);
    const [newFiles, setNewFiles] = useState([]);
    const [analyzing, setAnalyzing] = useState(true);

    const { activeLanguage } = useLanguage();

    const analyzeWithAI = async () => {
        try {
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

    const handleAnalyzeButton = useCallback(() => {
        if (!path) {
            console.error("Path is undefined!");
            return;
        }

        if (newFiles.length > 0) {
            const state = {
                suggestedFileOrg: newFiles,
                currentPath: path,
            };
            navigate("/suggested", { state });
        }
    }, [navigate, path, newFiles]);

    useEffect(() => {
        analyzeWithAI();
    }, []);

    return (
        <div className="w-full min-h-screen py-12 bg-black text-white flex flex-col justify-center items-center">
            {analyzing ? (
                <>
                    <FaMagic className="animate-spin text-3xl mb-4 text-purple-500" />
                    <h2 className="text-xl font-light animate-pulse">
                        {t("selectedFoldersPage.analyzingFiles")}
                    </h2>
                </>
            ) : (
                <div className="container mx-auto max-w-7xl p-4 md:p-8 pt-16">
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
                    {error ? (
                        <div className="mb-4 p-3 bg-red-900/20 border border-red-800/30 rounded-lg text-red-400">
                            {error}
                        </div>
                    ) : null}

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
                            <div>
                                <FileListRenderer files={files} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedFolders;
