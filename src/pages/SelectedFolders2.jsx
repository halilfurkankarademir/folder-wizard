import { useState, useEffect } from "react";
import {
    FaFile,
    FaArrowLeft,
    FaMagic,
    FaArrowRight,
    FaSort,
    FaFilter,
    FaSearch,
} from "react-icons/fa";
import { getFileIcon } from "../utils/helpers";
import getResponseFromAI from "../services/aiService";
import { useLocation, useNavigate } from "react-router-dom";
import prompts from "../utils/constans/prompts";
import MagicBackground from "../components/effects";
import { useTranslation } from "react-i18next";

export default function SelectedFolders2() {
    const { state: locationState } = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [state, setState] = useState({
        path: locationState?.path || "/D:/Projeler/Web/React/folder-wizard",
        files: locationState?.files || [],
    });
    const [error, setError] = useState(null);
    const [newFiles, setNewFiles] = useState([]);
    const [analyzing, setAnalyzing] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedFileTypes, setSelectedFileTypes] = useState([]);
    const [showFilters, setShowFilters] = useState(false);

    // Dosya türlerini topla
    const fileTypes = [
        ...new Set(
            state.files?.map((file) => {
                const extension = file.name.split(".").pop().toLowerCase();
                return extension || "folder";
            })
        ),
    ];

    const toggleFileType = (type) => {
        if (selectedFileTypes.includes(type)) {
            setSelectedFileTypes(selectedFileTypes.filter((t) => t !== type));
        } else {
            setSelectedFileTypes([...selectedFileTypes, type]);
        }
    };

    const filteredFiles = state.files?.filter((file) => {
        const extension = file.name.split(".").pop().toLowerCase();
        const matchesSearch = file.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesType =
            selectedFileTypes.length === 0 ||
            selectedFileTypes.includes(extension || "folder");
        return matchesSearch && matchesType;
    });

    const sortedFiles = [...(filteredFiles || [])].sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
            case "name":
                comparison = a.name.localeCompare(b.name);
                break;
            case "size":
                comparison = (a.size || 0) - (b.size || 0);
                break;
            case "date":
                comparison =
                    new Date(a.lastModified) - new Date(b.lastModified);
                break;
            default:
                comparison = 0;
        }
        return sortOrder === "asc" ? comparison : -comparison;
    });

    const analyzeWithAI = async () => {
        try {
            const prompt = prompts["tr"];
            const newFoldersData = await getResponseFromAI(
                `${prompt} ${JSON.stringify(state.files)}`
            );
            if (newFoldersData) {
                setNewFiles(newFoldersData);
                setAnalyzing(false);
            }
        } catch (err) {
            setError("AI analizinde hata oluştu");
            setAnalyzing(false);
        }
    };

    const handleAnalyzeButton = () => {
        if (newFiles.length > 0) {
            navigate("/suggested", {
                state: { suggestedFileOrg: newFiles, currentPath: state.path },
            });
        }
    };

    useEffect(() => {
        // Fake dosya verileri oluştur
        const fakeFiles = [
            {
                name: "proje-dokumantasyonu.docx",
                size: 2456789,
                lastModified: new Date(2024, 2, 15).getTime(),
            },
            {
                name: "sunum.pptx",
                size: 5678901,
                lastModified: new Date(2024, 2, 14).getTime(),
            },
            {
                name: "veri-analizi.xlsx",
                size: 1234567,
                lastModified: new Date(2024, 2, 13).getTime(),
            },
            {
                name: "resimler",
                size: 0,
                lastModified: new Date(2024, 2, 12).getTime(),
            },
            {
                name: "logo.png",
                size: 234567,
                lastModified: new Date(2024, 2, 11).getTime(),
            },
            {
                name: "rapor.pdf",
                size: 3456789,
                lastModified: new Date(2024, 2, 10).getTime(),
            },
            {
                name: "kodlar",
                size: 0,
                lastModified: new Date(2024, 2, 9).getTime(),
            },
            {
                name: "index.html",
                size: 12345,
                lastModified: new Date(2024, 2, 8).getTime(),
            },
            {
                name: "style.css",
                size: 23456,
                lastModified: new Date(2024, 2, 7).getTime(),
            },
            {
                name: "script.js",
                size: 34567,
                lastModified: new Date(2024, 2, 6).getTime(),
            },
            {
                name: "veritabani.sql",
                size: 45678,
                lastModified: new Date(2024, 2, 5).getTime(),
            },
            {
                name: "config.json",
                size: 5678,
                lastModified: new Date(2024, 2, 4).getTime(),
            },
            {
                name: "dokumanlar",
                size: 0,
                lastModified: new Date(2024, 2, 3).getTime(),
            },
            {
                name: "README.md",
                size: 1234,
                lastModified: new Date(2024, 2, 2).getTime(),
            },
            {
                name: "LICENSE",
                size: 2345,
                lastModified: new Date(2024, 2, 1).getTime(),
            },
        ];

        // State'i güncelle
        if (!locationState?.files) {
            setState((prevState) => ({
                ...prevState,
                files: fakeFiles,
            }));
        }

        analyzeWithAI();
    }, [locationState]);

    if (!state.path || !state.files) {
        return (
            <div className="w-full h-screen bg-neutral-950 text-white flex flex-col justify-center items-center">
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 max-w-md">
                    <p className="text-center text-lg mb-4 text-zinc-300">
                        {t("selectedFolders.invalidAccess")}
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-300 flex items-center justify-center gap-2 mx-auto font-medium"
                    >
                        <FaArrowLeft />
                        <span>{t("selectedFolders.backToHomepage")}</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center">
            {false ? (
                <div className="w-full h-screen flex flex-col justify-center items-center text-white">
                    <MagicBackground />
                    <FaMagic className="animate-spin text-3xl mb-4 text-purple-500" />
                    <h2 className="text-xl font-light animate-pulse">
                        {t("selectedFolders.analyzing")}
                    </h2>
                </div>
            ) : (
                <div className="container mx-auto max-w-7xl p-4 md:p-8 pt-16">
                    <MagicBackground />

                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-light mb-2">
                                    {t("selectedFolders.selectedFolder")}
                                </h1>
                                <p className="text-zinc-500 font-mono text-sm bg-zinc-900/50 p-2 rounded-lg border border-zinc-800">
                                    {state.path}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleAnalyzeButton}
                                    disabled={analyzing}
                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-300 flex items-center gap-2 font-medium"
                                >
                                    <FaArrowRight />
                                    <span>
                                        {t("selectedFolders.showSuggestions")}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="mb-6 space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder={t(
                                        "selectedFolders.searchFiles"
                                    )}
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                                />
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white hover:bg-zinc-800 transition-colors flex items-center gap-2"
                            >
                                <FaFilter />
                                <span>{t("selectedFolders.filters")}</span>
                            </button>
                        </div>

                        {/* Filters Panel */}
                        {showFilters && (
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                                <div className="mb-4">
                                    <h3 className="text-sm font-medium mb-2">
                                        {t("selectedFolders.fileTypes")}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {fileTypes.map((type) => (
                                            <button
                                                key={type}
                                                onClick={() =>
                                                    toggleFileType(type)
                                                }
                                                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                                    selectedFileTypes.includes(
                                                        type
                                                    )
                                                        ? "bg-purple-600 text-white"
                                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                                }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium mb-2">
                                        {t("selectedFolders.sortBy")}
                                    </h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setSortBy("name");
                                                setSortOrder(
                                                    sortBy === "name" &&
                                                        sortOrder === "asc"
                                                        ? "desc"
                                                        : "asc"
                                                );
                                            }}
                                            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                                sortBy === "name"
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                            }`}
                                        >
                                            {t("selectedFolders.name")}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSortBy("size");
                                                setSortOrder(
                                                    sortBy === "size" &&
                                                        sortOrder === "asc"
                                                        ? "desc"
                                                        : "asc"
                                                );
                                            }}
                                            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                                sortBy === "size"
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                            }`}
                                        >
                                            {t("selectedFolders.size")}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSortBy("date");
                                                setSortOrder(
                                                    sortBy === "date" &&
                                                        sortOrder === "asc"
                                                        ? "desc"
                                                        : "asc"
                                                );
                                            }}
                                            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                                sortBy === "date"
                                                    ? "bg-purple-600 text-white"
                                                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                            }`}
                                        >
                                            {t("selectedFolders.date")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Files List */}
                    <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-light">
                                {t("selectedFolders.filesInFolder")}
                            </h2>
                            <span className="px-2 py-0.5 bg-zinc-800 rounded-full text-sm border border-zinc-700">
                                {sortedFiles.length}
                            </span>
                        </div>

                        {sortedFiles.length === 0 ? (
                            <p className="text-zinc-500 italic">
                                {t("selectedFolders.noFilesFound")}
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {sortedFiles.map((file, index) => {
                                    const IconComponent =
                                        getFileIcon(file.name) || FaFile;
                                    const extension = file.name
                                        .split(".")
                                        .pop()
                                        .toLowerCase();
                                    const fileSize = file.size
                                        ? formatFileSize(file.size)
                                        : "-";
                                    const lastModified = file.lastModified
                                        ? new Date(
                                              file.lastModified
                                          ).toLocaleDateString()
                                        : "-";

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/30 hover:bg-zinc-800 transition-colors duration-150"
                                        >
                                            <span className="w-8 h-8 flex items-center justify-center bg-purple-600/30 rounded-full text-purple-300">
                                                <IconComponent />
                                            </span>
                                            <div className="ml-3 flex-1">
                                                <div className="flex items-center">
                                                    <span className="text-sm text-zinc-300">
                                                        {file.name}
                                                    </span>
                                                    {extension && (
                                                        <span className="text-xs text-zinc-400 ml-1">
                                                            .{extension}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 mt-1">
                                                    <span className="text-xs text-zinc-500">
                                                        {fileSize}
                                                    </span>
                                                    <span className="text-xs text-zinc-500">
                                                        {lastModified}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// Dosya boyutunu formatla
function formatFileSize(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
