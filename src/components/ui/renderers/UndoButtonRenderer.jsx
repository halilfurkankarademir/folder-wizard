import { FaSpinner, FaCheck, FaUndo } from "react-icons/fa";

const UndoButtonRenderer = ({ undoStatus, handleClickUndo, t }) => {
    switch (undoStatus) {
        case "loading":
            return (
                <button
                    disabled
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm bg-neutral-800 text-white rounded-lg transition-all duration-300 opacity-70"
                >
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    {t("undoing")}
                </button>
            );
        case "success":
            return (
                <div className="flex items-center justify-center gap-2 px-4 py-3 text-sm bg-green-500/10 text-green-400 rounded-lg animate-fadeIn">
                    <FaCheck className="w-4 h-4" />
                    {t("undoSuccess")}
                </div>
            );
        case "error":
            return (
                <div className="flex items-center justify-center gap-2 px-4 py-3 text-sm bg-red-500/10 text-red-400 rounded-lg animate-shake">
                    <FaUndo className="w-4 h-4" />
                    {t("undoError")}
                </div>
            );
        default:
            return (
                <button
                    onClick={handleClickUndo}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-all duration-300"
                >
                    <FaUndo className="w-4 h-4" />
                    {t("undoOrganisation")}
                </button>
            );
    }
};

export default UndoButtonRenderer;
