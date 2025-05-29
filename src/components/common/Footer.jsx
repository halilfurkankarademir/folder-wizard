import { useTranslation } from "react-i18next";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";
import links from "../../utils/constants/links";

const Footer = () => {
    const { t } = useTranslation();

    const handleClickOpenLink = async (linkType) => {
        await window.electronAPI?.invoke?.("open-link", links[linkType]);
    };

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-sm py-4 px-4 md:px-8 text-sm text-zinc-500">
            <div className="max-w-full mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                {/* Left section */}
                <div className="flex items-center space-x-5">
                    <button
                        onClick={() => handleClickOpenLink("github")}
                        aria-label="GitHub"
                        className="hover:text-purple-400 transition-colors"
                    >
                        <BsGithub className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => handleClickOpenLink("linkedin")}
                        aria-label="LinkedIn"
                        className="hover:text-purple-400 transition-colors"
                    >
                        <BsLinkedin className="w-5 h-5" />
                    </button>
                </div>

                {/*  Middle section */}
                <div className="text-center md:text-center">
                    <p className="font-medium text-zinc-400">
                        Folder Wizard by Halil Furkan Karademir
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                        &copy; {new Date().getFullYear()} Folder Wizard
                    </p>
                </div>

                {/* Right section */}
                <div className="flex space-x-4">
                    <Link
                        to="/privacy"
                        className="hover:text-purple-400 transition-colors"
                    >
                        {t("footer.privacy")}
                    </Link>
                    <button
                        onClick={() => handleClickOpenLink("license")}
                        className="hover:text-purple-400 transition-colors"
                    >
                        {t("footer.license")}
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
