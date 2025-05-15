import fileFormats from "./constans/fileFormats";
import fileIcons from "./constans/fileIcons";

// Detects file format based on file name
const detectFileFormat = (fileName) => {
    // Eğer fileName undefined veya null ise, varsayılan döndür
    if (!fileName) return "default";

    try {
        const fileExtension = fileName.split(".").pop().toLowerCase();
        return fileFormats[fileExtension] || "default";
    } catch (error) {
        console.warn("Dosya formatı algılanamadı:", error);
        return "default";
    }
};

// Returns the icon component based on the file format
export const getFileIcon = (fileName) => {
    const fileFormat = detectFileFormat(fileName);
    return fileIcons[fileFormat] || fileIcons.default;
};
