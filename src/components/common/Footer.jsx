import { useTranslation } from "react-i18next";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
    const { t } = useTranslation();

    const handleClickGithub = () => {
        window.electronAPI?.openLink?.(
            "https://github.com/halilfurkankarademir/folder-wizard"
        );
    };

    const handleClickLinkedin = () => {
        window.electronAPI?.openLink?.(
            "https://linkedin.com/in/halilfurkankarademir/"
        );
    };

    const handleClickLicense = () => {
        window.electronAPI?.openLink?.(
            "https://github.com/halilfurkankarademir/folder-wizard/blob/main/LICENSE"
        );
    };

    return (
        <footer className="fixed bottom-0 left-0 right-0 py-3 px-4 md:px-8 z-50 backdrop-blur-sm">
            <div className="max-w-full mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-6 mb-3 md:mb-0">
                        <button
                            onClick={handleClickGithub}
                            className="text-zinc-500 hover:text-purple-400 transition-colors"
                            aria-label="GitHub"
                        >
                            <BsGithub className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleClickLinkedin}
                            className="text-zinc-500 hover:text-purple-400 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <BsLinkedin className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-medium mb-1">
                            &copy; {new Date().getFullYear()} Folder Wizard
                        </p>
                        <div className="flex justify-center md:justify-end space-x-4 text-xs text-zinc-500">
                            <Link
                                to={"/privacy"}
                                className="hover:text-purple-400 transition-colors"
                            >
                                {t("footer.privacy")}
                            </Link>
                            <Link
                                onClick={handleClickLicense}
                                className="hover:text-purple-400 transition-colors"
                            >
                                {t("footer.license")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
