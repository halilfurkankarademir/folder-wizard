import { FaFolder, FaArrowLeft, FaCheck, FaMagic } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MagicBackground from "../components/effects";

const SuggestedOrganisation = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { suggestedFileOrg } = state || {};
    const [selectedFiles, setSelectedFiles] = useState([]);

    const toggleFileSelection = (fileIndex) => {
        if (selectedFiles.includes(fileIndex)) {
            setSelectedFiles(selectedFiles.filter((idx) => idx !== fileIndex));
        } else {
            setSelectedFiles([...selectedFiles, fileIndex]);
        }
    };

    const applyChanges = () => {
        // window.electronAPI.applyChanges....
        alert("Değişiklikler uygulanacak!");
    };

    // This effect is to set all files as selected when suggestedFileOrg changes.
    useEffect(() => {
        if (suggestedFileOrg && suggestedFileOrg.length > 0) {
            setSelectedFiles(suggestedFileOrg.map((_, index) => index));
        }
    }, [suggestedFileOrg]);

    if (!suggestedFileOrg || suggestedFileOrg.length === 0) {
        return (
            <div className="w-full h-screen mt-8 bg-neutral-950 text-white flex flex-col justify-center items-center pt-16 pb-24">
                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 max-w-md">
                    <p className="text-center text-lg mb-4 text-zinc-300">
                        Henüz öneri bulunmuyor veya geçersiz erişim.
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-300 flex items-center justify-center gap-2 mx-auto font-medium"
                    >
                        <FaArrowLeft />
                        <span>Anasayfaya Dön</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen  bg-neutral-950 text-white flex flex-col justify-center items-center">
            <MagicBackground />
            <div className="container mx-auto max-w-7xl p-4 md:p-8 pt-16 pb-12">
                {/* Header */}
                <div className="mb-8 mt-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-light mb-2">
                                Önerilen Organizasyon
                            </h1>
                            <p className="text-zinc-500 text-sm">
                                Dosyalarınız için önerilen düzenleme
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
                                <span>Sihri Gerçekleştir</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Suggested Files List */}
                <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <h2 className="text-xl font-light">
                                Dosya Organizasyonu
                            </h2>
                            <span className="ml-2 px-2 py-0.5 bg-zinc-800 rounded-full text-sm border border-zinc-700">
                                {suggestedFileOrg.length}
                            </span>
                        </div>
                        <div className="text-sm text-zinc-500">
                            <span className="mr-1">Seçili:</span>
                            <span className="text-white">
                                {selectedFiles.length}
                            </span>
                        </div>
                    </div>

                    {/* File List */}
                    <div className="space-y-2 max-h-[calc(100vh-350px)] overflow-y-auto">
                        {suggestedFileOrg.map((file, index) => (
                            <div
                                key={index}
                                className={`flex items-center p-3 rounded-lg border transition-colors duration-150 cursor-pointer ${
                                    selectedFiles.includes(index)
                                        ? "bg-zinc-800 border-zinc-600"
                                        : "bg-zinc-800/50 border-zinc-700/30 hover:bg-zinc-800"
                                }`}
                                onClick={() => toggleFileSelection(index)}
                            >
                                <span className="w-8 h-8 flex items-center justify-center bg-purple-600/30 rounded-full text-purple-300">
                                    <FaFolder />
                                </span>
                                <div className="ml-3 truncate flex-1">
                                    <div className="text-sm text-zinc-300">
                                        {file.fileName}
                                    </div>
                                    <div className="text-xs text-zinc-500 flex items-center">
                                        <span className="mr-1">→</span>
                                        <span className="font-semibold">
                                            {file.targetFolder}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-2">
                                    {selectedFiles.includes(index) ? (
                                        <span className="w-6 h-6 flex items-center justify-center bg-purple-600 rounded-full text-white">
                                            <FaCheck className="text-xs" />
                                        </span>
                                    ) : (
                                        <span className="w-6 h-6 flex items-center justify-center bg-zinc-800 rounded-full border border-zinc-700"></span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuggestedOrganisation;
