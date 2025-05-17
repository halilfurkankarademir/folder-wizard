const fs = require("fs-extra");
const path = require("path");
const pLimit = require("p-limit").default;

// Allowed file count to be organised
const ALLOWED_FILE_COUNT = 100;

// Allow 5 files to be moved at a time
const limit = pLimit(5);

/**
 * Moves all files to their specified target folders within the given current path.
 * @param {Array<{fileName:string, targetFolder:string}>} files - All of the files to be moved
 * @param {string} currentPath - Current path of the folder
 */
async function organiseFiles(files, currentPath) {
    if (!files || !currentPath) return;

    try {
        // Map all files to limited async move operations
        const movePromises = files.map((file) =>
            limit(async () => {
                const { fileName, targetFolder } = file;
                // Folder path where file will be moved
                const targetFolderPath = path.join(currentPath, targetFolder);

                // Creates directory if not exists
                await fs.ensureDir(targetFolderPath);

                // Source path of the file (exp C:\Users\user\Downloads\file.txt)
                const sourceFilePath = path.join(currentPath, fileName);

                // Destination path of the file (C:\Users\user\Downloads\folder\file.txt)
                const destinationFilePath = path.join(
                    targetFolderPath,
                    fileName
                );

                // Moves the file
                await fs.move(sourceFilePath, destinationFilePath, {
                    overwrite: true,
                });
                console.log("Files moved successfully.");
            })
        );

        // Wait for all move operations to complete
        await Promise.all(movePromises);

        console.log("Files moved successfully.");
    } catch (error) {
        console.error("File move failed:", error);
    }
}

async function listFiles(dir) {
    let results = [];

    const files = await fs.readdir(dir, { withFileTypes: true });

    const fileCount = files.length;

    if (fileCount > ALLOWED_FILE_COUNT) {
        throw new Error(
            `En fazla ${ALLOWED_FILE_COUNT} adet dosya organize edilebilir.`
        );
    }

    results = await Promise.all(
        files.map(async (file) => ({
            name: file.name,
            isFile: file.isFile(),
            isDirectory: file.isDirectory(),
        }))
    );

    return results;
}

module.exports = { organiseFiles, listFiles };
