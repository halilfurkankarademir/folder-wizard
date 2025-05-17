import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFolder, FaCheck, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FoldersOrganising = () => {
    const [done, setDone] = useState(false);

    const navigate = useNavigate();

    const { t } = useTranslation();

    useEffect(() => {
        const timer = setTimeout(() => setDone(true), 5000); // 5 saniye

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center p-8">
            {!done ? (
                <>
                    <div className="text-purple-600 mb-8 flex items-center space-x-4">
                        <FaFolder className="text-7xl animate-bounce" />
                        <div className="flex space-x-3">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="text-purple-400 text-4xl animate-moveUpDown"
                                    style={{ animationDelay: `${i * 0.3}s` }}
                                >
                                    📄
                                </div>
                            ))}
                        </div>
                    </div>
                    <h2 className="text-xl font-light tracking-wide text-zinc-300">
                        {t("foldersOrganizing")}
                    </h2>
                </>
            ) : (
                <div className="flex flex-col items-center space-y-4">
                    <FaCheck className="text-6xl text-green-400" />
                    <h2 className="text-xl font-semibold text-green-400 tracking-wide">
                        {t("organizationCompleted")}
                    </h2>
                    <button
                        className="mt-2 px-3 py-3 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-300 flex items-center justify-center gap-2 mx-auto font-medium"
                        onClick={() => navigate("/")}
                    >
                        {t("backToHomepage")}
                    </button>
                </div>
            )}

            <style>{`
        @keyframes moveUpDown {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-20%); opacity: 1; }
        }
        .animate-moveUpDown {
          animation: moveUpDown 1.2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default FoldersOrganising;
