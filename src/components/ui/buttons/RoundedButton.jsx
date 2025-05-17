import React from "react";
import { FaChevronRight, FaFolder } from "react-icons/fa";

const RoundedButton = ({ hasClicked, onClick }) => {
    return (
        <button
            onClick={onClick}
            disabled={hasClicked}
            className="group relative overflow-hidden px-6 py-3 bg-purple-600 text-white rounded-full transition-all duration-300 flex items-center gap-2 mx-auto font-medium hover:scale-105 active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
        >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative z-10 flex items-center gap-2">
                {hasClicked ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Yükleniyor</span>
                    </>
                ) : (
                    <>
                        <FaFolder className="text-sm" />
                        <span>Klasör Seç</span>
                        <FaChevronRight className="text-xs opacity-70" />
                    </>
                )}
            </span>
        </button>
    );
};

export default RoundedButton;
