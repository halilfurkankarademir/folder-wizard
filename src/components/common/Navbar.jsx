import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaRegWindowMinimize } from "react-icons/fa";
import { LuFullscreen } from "react-icons/lu";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContex";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const { activeLanguage, setActiveLanguage } = useLanguage();

    const handleClickBack = () => {
        navigate("/");
    };

    const handleClickMinimize = () => {
        window.electronAPI?.minimizeWindow();
    };

    const handleClickFullscreen = () => {
        window.electronAPI?.maximizeWindow();
    };

    const handleClickClose = () => {
        window.electronAPI?.closeWindow();
    };

    return (
        <nav className="w-full flex justify-between p-3  fixed top-0 left-0 z-50 draggable backdrop-blur-sm">
            <div className="flex items-center no-drag">
                <div className="flex items-center gap-2">
                    {!isHomePage && (
                        <button
                            onClick={handleClickBack}
                            className="text-zinc-400 hover:text-purple-400 transition-colors mr-2"
                        >
                            <MdArrowBack className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex items-center space-x-6 no-drag">
                <button
                    className="text-zinc-500 hover:text-purple-400 transition-colors"
                    onClick={() =>
                        setActiveLanguage(activeLanguage === "tr" ? "en" : "tr")
                    }
                >
                    {activeLanguage === "tr" ? "EN" : "TR"}
                </button>
                <button
                    onClick={handleClickMinimize}
                    className="text-zinc-500 hover:text-purple-400 transition-colors"
                >
                    <FaRegWindowMinimize className="w-4 h-4" />
                </button>
                <button
                    onClick={handleClickFullscreen}
                    className="text-zinc-500 hover:text-purple-400 transition-colors"
                >
                    <LuFullscreen className="w-5 h-5" />
                </button>
                <button
                    onClick={handleClickClose}
                    className="text-zinc-500 hover:text-red-400 transition-colors"
                >
                    <CgClose className="w-5 h-5" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
