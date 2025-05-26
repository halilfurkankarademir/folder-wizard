import { useLocation } from "react-router-dom";
import { useFileOrganization } from "../../hooks/useFileOrganization";
import { OrganizationHeader } from "../../components/FileOrganization/OrganizationHeader";
import { FileGroupCard } from "../../components/FileOrganization/FileGroupCard";
import MagicBackground from "../../components/effects";
import FoldersOrganising from "./FoldersOrganising";

const SuggestedOrganisation = () => {
    const { state } = useLocation();
    const { suggestedFileOrg, currentPath } = state || {};

    const { hasOrganised, groupedFiles, applyChanges } =
        useFileOrganization(suggestedFileOrg);

    if (hasOrganised) {
        return <FoldersOrganising />;
    }

    return (
        <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col justify-center items-center py-12">
            <MagicBackground />
            <div className="container mx-auto max-w-7xl p-4 md:p-8 pt-16 pb-12">
                <OrganizationHeader
                    onApplyChanges={() => applyChanges(currentPath)}
                />

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
