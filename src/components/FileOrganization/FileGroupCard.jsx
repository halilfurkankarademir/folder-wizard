import { FaFolder } from "react-icons/fa";
import { FileSelectionItem } from "./FileSelectionItem";

export const FileGroupCard = ({ targetFolder, files }) => {
    return (
        <div className="bg-zinc-900/40 rounded-xl border border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-purple-600/30 rounded-full text-purple-300">
                        <FaFolder />
                    </span>
                    <h2 className="text-xl font-light ml-3">{targetFolder}</h2>
                    <span className="ml-2 px-2 py-0.5 bg-zinc-800 rounded-full text-sm border border-zinc-700">
                        {files.length}
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                {files.map((file, index) => {
                    return <FileSelectionItem key={index} file={file} />;
                })}
            </div>
        </div>
    );
};
