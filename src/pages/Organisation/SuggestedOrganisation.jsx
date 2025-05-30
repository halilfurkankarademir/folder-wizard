import { useLocation, useNavigate } from "react-router-dom";
import { useFileOrganization } from "../../hooks/useFileOrganization";
import { OrganizationHeader } from "../../components/FileOrganization/OrganizationHeader";
import { FileGroupCard } from "../../components/FileOrganization/FileGroupCard";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SuggestedOrganisation = () => {
    const { state } = useLocation();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { suggestedFileOrg, currentPath } = state || {};

    const { hasOrganised, groupedFiles, applyChanges, setHasOrganised, error } =
        useFileOrganization(suggestedFileOrg);

    useEffect(() => {
        if (hasOrganised) {
            navigate("/organising");
            setHasOrganised(false);
        }
    }, [hasOrganised, navigate, setHasOrganised]);

    return (
        <div className="w-full min-h-screen bg-black text-white flex flex-col justify-center items-center py-12">
            <div className="container  max-w-7xl p-4 md:p-8 pt-16 pb-12">
                <OrganizationHeader
                    onApplyChanges={() => applyChanges(currentPath)}
                />
                {error ? (
                    <div className="text-red-500 mb-4 ml-auto">
                        {t(`errors.${error}`)}
                    </div>
                ) : null}

                <div className="space-y-6 mb-12">
                    {Object.entries(groupedFiles).map(
                        ([targetFolder, files]) => (
                            <FileGroupCard
                                key={targetFolder}
                                targetFolder={targetFolder}
                                files={files}
                                suggestedFileOrg={suggestedFileOrg}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuggestedOrganisation;
