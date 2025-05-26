import { FixedSizeList as List } from "react-window";
import { getFileIcon } from "../../../utils/helpers";
import { FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function FileListRenderer({ files }) {
    const { t } = useTranslation();

    const openFile = async (file) => {
        try {
            await window.electronAPI?.invoke("open-file", file.path);
        } catch (error) {
            throw error;
        }
    };

    const Row = ({ index, style }) => {
        const file = files[index];
        const IconComponent = getFileIcon(file.name);

        const margin = 10;
        const rowStyle = {
            ...style,
            width: "99%",
            height: style.height - margin,
        };

        return (
            <div
                style={rowStyle}
                className="flex items-center justify-between px-3 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700/30 hover:bg-zinc-800 transition-colors duration-150 mx-1 my-1 z-10"
            >
                <span className="w-8 h-8 flex items-center justify-center bg-purple-600/30 rounded-full text-purple-300">
                    <IconComponent />
                </span>
                <div className="ml-3 flex-1">
                    <span className="text-sm text-zinc-300">{file.name}</span>
                    {file.reason && (
                        <p className="text-xs text-zinc-500 mt-1">
                            {file.reason}
                        </p>
                    )}
                </div>
                <button onClick={() => openFile(file)}>
                    <FaEye
                        className="text-zinc-300 hover:text-zinc-500 transition-colors duration-150 z-50"
                        aria-label="Show File Location"
                        title={t("showFileLocation")}
                    />
                </button>
            </div>
        );
    };

    return (
        <List height={400} itemCount={files.length} itemSize={75} width="100%">
            {Row}
        </List>
    );
}

export default FileListRenderer;
