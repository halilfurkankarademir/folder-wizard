import fileFormats from "./constans/fileFormats";
import fileIcons from "./constans/fileIcons";

// Detects file format based on file name
const detectFileFormat = (fileName) => {
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
const getFileIcon = (fileName) => {
    const fileFormat = detectFileFormat(fileName);
    return fileIcons[fileFormat] || fileIcons.default;
};

// It cleans ```json and ``` from ai response
function parseAIJsonResponse(aiResponse) {
    try {
        const cleanString = aiResponse.replace(/^```json|```$/gm, "").trim();
        return JSON.parse(cleanString);
    } catch (error) {
        console.error("Parse error:", error);
        return null;
    }
}

export { detectFileFormat, getFileIcon, parseAIJsonResponse };
