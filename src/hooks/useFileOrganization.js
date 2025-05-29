import { useState, useEffect } from "react";

export const useFileOrganization = (suggestedFileOrg) => {
    const [hasOrganised, setHasOrganised] = useState(false);
    const [groupedFiles, setGroupedFiles] = useState({});
    const [error, setError] = useState(null);

    const applyChanges = async (currentPath) => {
        if (
            !currentPath ||
            !suggestedFileOrg ||
            suggestedFileOrg.length === 0
        ) {
            console.error("Missing data for organization!");
            return;
        }

        try {
            const response = await window.electronAPI?.invoke(
                "organise-files",
                {
                    files: suggestedFileOrg,
                    currentPath: currentPath,
                }
            );

            if (response?.error) {
                setError(response.error);
                return;
            }

            setHasOrganised(true);
        } catch (error) {
            console.error("Organization error:", error);
        }
    };

    useEffect(() => {
        if (suggestedFileOrg && suggestedFileOrg.length > 0) {
            const grouped = suggestedFileOrg.reduce((acc, file) => {
                if (!acc[file.targetFolder]) {
                    acc[file.targetFolder] = [];
                }
                acc[file.targetFolder].push(file);
                return acc;
            }, {});
            setGroupedFiles(grouped);
        }
    }, [suggestedFileOrg]);

    return {
        hasOrganised,
        groupedFiles,
        applyChanges,
        setHasOrganised,
        error,
    };
};
