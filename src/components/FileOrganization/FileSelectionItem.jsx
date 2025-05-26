import { getFileIcon } from "../../utils/helpers";

export const FileSelectionItem = ({ file, onToggle }) => {
    const IconComponent = getFileIcon(file.fileName);

    return (
        <div
            className={`flex items-center p-3 rounded-lg border transition-colors duration-150 cursor-pointer "bg-zinc-800/50 border-zinc-700/30 hover:bg-zinc-800`}
            onClick={onToggle}
        >
            <span className="w-8 h-8 flex items-center justify-center bg-purple-600/30 rounded-full text-purple-300">
                <IconComponent />
            </span>
            <div className="ml-3 flex-1">
                <span className="text-sm text-zinc-300">{file.fileName}</span>
                {file.reason && (
                    <p className="text-xs text-zinc-500 mt-1">{file.reason}</p>
                )}
            </div>
        </div>
    );
};
