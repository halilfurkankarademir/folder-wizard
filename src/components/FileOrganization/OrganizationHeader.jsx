import { useTranslation } from "react-i18next";
import { FaMagic } from "react-icons/fa";

export const OrganizationHeader = ({ onApplyChanges }) => {
    const { t } = useTranslation();

    return (
        <div className="mb-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-light mb-2">
                        {t("suggestedFoldersPage.title")}
                    </h1>
                    <p className="text-zinc-500 text-sm">
                        {t("suggestedFoldersPage.suggestedOrganisation")}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={onApplyChanges}
                        className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 font-medium  bg-purple-600 hover:bg-purple-700 text-white
                        `}
                    >
                        <FaMagic />
                        <span>{t("suggestedFoldersPage.makeTheMagic")}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
