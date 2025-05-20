import { CgClose } from "react-icons/cg";
import { FaRegWindowMinimize } from "react-icons/fa";
import { LuFullscreen } from "react-icons/lu";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const handleClickBack = () => {
        navigate("/");
    };

    const handleClickMinimize = () => {
        window.electronAPI?.invoke("minimize-window");
    };

    const handleClickFullscreen = () => {
        window.electronAPI?.invoke("toggle-fullscreen");
    };

    const handleClickClose = () => {
        window.electronAPI?.invoke("close-window");
    };

    return (
        <nav className="w-full flex justify-between p-3  fixed top-0 left-0 z-50 draggable backdrop-blur-sm">
            <div className="flex items-center no-drag">
                <div className="flex items-center gap-3 no-drag">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-10 h-10 opacity-60 hover:opacity-100 transition-opacity duration-200"
                    />
                    {!isHomePage && (
                        <button
                            onClick={handleClickBack}
                            className="text-zinc-400 hover:text-purple-400 transition-colors"
                        >
                            <MdArrowBack className="w-6 h-6" />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex items-center space-x-6 no-drag">
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
