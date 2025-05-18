import {
    FaFolder,
    FaArrowLeft,
    FaCheck,
    FaMagic,
    FaFile,
    FaFileImage,
    FaFilePdf,
    FaFileWord,
    FaFileExcel,
    FaFileArchive,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MagicBackground from "../components/effects";
import FoldersOrganising from "../components/ui/animations/FoldersOrganising";
import { useTranslation } from "react-i18next";
import { getFileIcon } from "../utils/helpers";

const SuggestedOrganisation = () => {
    const { t } = useTranslation();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { suggestedFileOrg, currentPath } = state || {};

    // Debug için state ve currentPath'i logla
    console.log("State:", state);
    console.log("Current Path:", currentPath);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [hasOrganised, setHasOrganised] = useState(false);
    const [groupedFiles, setGroupedFiles] = useState({});

    // currentPath kontrolü
    if (!currentPath) {
        console.error("Current path is missing!");
        return (
            <div className="w-full h-screen mt-8 bg-neutral-950 text-white flex flex-col justify-center items-center pt-16 pb-24">
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 max-w-md">
                    <p className="text-center text-lg mb-4 text-zinc-300">
                        {t("suggestedFoldersPage.thereIsNoSuggestions")}
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-300 flex items-center justify-center gap-2 mx-auto font-medium"
                    >
                        <FaArrowLeft />
                        <span>{t("suggestedFoldersPage.backToHomepage")}</span>
                    </button>
                </div>
            </div>
        );
    }

    const toggleFileSelection = (fileIndex) => {
        if (selectedFiles.includes(fileIndex)) {
            setSelectedFiles(selectedFiles.filter((idx) => idx !== fileIndex));
        } else {
            setSelectedFiles([...selectedFiles, fileIndex]);
        }
    };

    const applyChanges = async () => {
        if (!currentPath) {
            console.error("Current path is missing!");
            return;
        }

        if (!suggestedFileOrg || suggestedFileOrg.length === 0) {
            console.error("No files to organize!");
            return;
        }

        try {
            const response = await window.electronAPI?.invoke(
                "organise-files",
                {
                    files: suggestedFileOrg,
                    currentPath: currentPath,
                }
            );

            console.log("Organize response:", response);

            if (response?.success) {
                setHasOrganised(true);
            } else {
                console.error("Organization failed:", response?.error);
            }
        } catch (error) {
            console.error(t("errors.organizationError"), error);
        }
    };

    useEffect(() => {
        if (suggestedFileOrg && suggestedFileOrg.length > 0) {
            setSelectedFiles(suggestedFileOrg.map((_, index) => index));

            // Dosyaları hedef klasörlere göre grupla
            const grouped = suggestedFileOrg.reduce((acc, file) => {
                if (!acc[file.targetFolder]) {
                    acc[file.targetFolder] = [];
                }
                acc[file.targetFolder].push(file);
                return acc;
            }, {});
            setGroupedFiles(grouped);
        }
    }, [suggestedFileOrg]);

    if (hasOrganised) {
        return <FoldersOrganising />;
    }

    if (!suggestedFileOrg || suggestedFileOrg.length === 0) {
        return (
            <div className="w-full h-screen mt-8 bg-neutral-950 text-white flex flex-col justify-center items-center pt-16 pb-24">
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 max-w-md">
                    <p className="text-center text-lg mb-4 text-zinc-300">
                        {t("suggestedFoldersPage.thereIsNoSuggestions")}
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-300 flex items-center justify-center gap-2 mx-auto font-medium"
                    >
                        <FaArrowLeft />
                        <span>{t("suggestedFoldersPage.backToHomepage")}</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center">
            <MagicBackground />
            <div className="container mx-auto max-w-7xl p-4 md:p-8 pt-16 pb-12">
                {/* Header */}
                <div className="mb-8 mt-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-light mb-2">
                                {t("suggestedFoldersPage.title")}
                            </h1>
                            <p className="text-zinc-500 text-sm">
                                {t(
                                    "suggestedFoldersPage.suggestedOrganisation"
                                )}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={applyChanges}
                                disabled={selectedFiles.length === 0}
                                className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 font-medium ${
                                    selectedFiles.length === 0
                                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                        : "bg-purple-600 hover:bg-purple-700 text-white"
                                }`}
                            >
                                <FaMagic />
                                <span>
                                    {t("suggestedFoldersPage.makeTheMagic")}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Suggested Files List */}
                <div className="space-y-6 mb-12">
                    {Object.entries(groupedFiles).map(
                        ([targetFolder, files]) => (
                            <div
                                key={targetFolder}
                                className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-4"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <span className="w-8 h-8 flex items-center justify-center bg-purple-600/30 rounded-full text-purple-300">
                                            <FaFolder />
                                        </span>
                                        <h2 className="text-xl font-light ml-3">
                                            {targetFolder}
                                        </h2>
                                        <span className="ml-2 px-2 py-0.5 bg-zinc-800 rounded-full text-sm border border-zinc-700">
                                            {files.length}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {files.map((file, index) => {
                                        const fileIndex =
                                            suggestedFileOrg.findIndex(
                                                (f) =>
                                                    f.fileName === file.fileName
                                            );

                                        const IconComponent = getFileIcon(
                                            file.fileName
                                        );

                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-center p-3 rounded-lg border transition-colors duration-150 cursor-pointer ${
                                                    selectedFiles.includes(
                                                        fileIndex
                                                    )
                                                        ? "bg-zinc-800 border-zinc-600"
                                                        : "bg-zinc-800/50 border-zinc-700/30 hover:bg-zinc-800"
                                                }`}
                                                onClick={() =>
                                                    toggleFileSelection(
                                                        fileIndex
                                                    )
                                                }
                                            >
                                                <span className="w-8 h-8 flex items-center justify-center bg-purple-600/30 rounded-full text-purple-300">
                                                    <IconComponent />
                                                </span>
                                                <div className="ml-3 truncate flex-1">
                                                    <div className="text-sm text-zinc-300">
                                                        {file.fileName}
                                                    </div>
                                                </div>
                                                <div className="ml-2">
                                                    {selectedFiles.includes(
                                                        fileIndex
                                                    ) ? (
                                                        <span className="w-6 h-6 flex items-center justify-center bg-purple-600 rounded-full text-white">
                                                            <FaCheck className="text-xs" />
                                                        </span>
                                                    ) : (
                                                        <span className="w-6 h-6 flex items-center justify-center bg-zinc-800 rounded-full border border-zinc-700"></span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuggestedOrganisation;
