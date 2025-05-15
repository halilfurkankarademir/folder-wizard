import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
    const handleClickGithub = () => {
        window.electronAPI?.openGithub?.();
    };

    const handleClickLinkedin = () => {
        window.electronAPI?.openLinkedin?.();
    };

    return (
        <footer
            className="fixed bottom-0 left-0 right-0 py-3 px-4 md:px-8 z-50"
            style={{
                background: "rgba(13, 13, 15, 0.85)",
                backdropFilter: "blur(12px)",
                borderTop: "1px solid rgba(82, 13, 140, 0.2)",
            }}
        >
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
                            <a
                                href="#"
                                className="hover:text-purple-400 transition-colors"
                            >
                                Gizlilik
                            </a>
                            <a
                                href="#"
                                className="hover:text-purple-400 transition-colors"
                            >
                                Şartlar
                            </a>
                            <a
                                href="#"
                                className="hover:text-purple-400 transition-colors"
                            >
                                Lisans
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
