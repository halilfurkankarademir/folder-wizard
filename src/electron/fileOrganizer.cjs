const fs = require("fs-extra");
const path = require("path");
const MoveFileCommand = require("./MoveFileCommand.cjs");
const pLimit = require("p-limit");

// Allowed file count to be organised
const ALLOWED_FILE_COUNT = 100;

// Allow 5 files to be moved at a time
const limit = pLimit(5);

// Stack of undo operations
const undoStack = [];

/**
 * Moves all files to their specified target folders within the given current path.
 * @param {Array<{fileName:string, targetFolder:string}>} files - All of the files to be moved
 * @param {string} currentPath - Current path of the folder
 */
async function organiseFiles(files, currentPath) {
    if (!files || !currentPath) {
        console.log("No files or current path provided.");
        console.log("Files:", files);
        console.log("Current Path:", currentPath);
        return { success: false, error: "No files or current path provided." };
    }

    console.log("Organising files...");
    console.log("Current Path:", currentPath);

    try {
        // Map all files to limited async move operations
        const movePromises = files.map((file) =>
            limit(async () => {
                const { fileName, targetFolder } = file;
                const source = path.join(currentPath, fileName);
                const destination = path.join(
                    currentPath,
                    targetFolder,
                    fileName
                );

                console.log("Moving file:", {
                    fileName,
                    source,
                    destination,
                });

                // Creates new move file command
                const command = new MoveFileCommand(source, destination);
                // Performs the move operation
                await command.do();
                // Adds the command to the undo stack for later if user wants to undo operation
                undoStack.push(command);
            })
        );

        // Wait for all move operations to complete
        await Promise.all(movePromises);

        console.log("Files moved successfully.");
        return { success: true };
    } catch (error) {
        console.error("File move failed:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Undoes the last organise operation
 */
async function undoLastOrganise() {
    while (undoStack.length > 0) {
        const lastCommand = undoStack.pop();
        try {
            await lastCommand.undo();
        } catch (e) {
            console.error("Undo failed for a file:", e);
        }
    }

    console.log("Undo complete.");
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
        files.map(async (file) => {
            const filePath = path.join(dir, file.name);
            const stat = await fs.stat(filePath);
            return {
                name: file.name,
                path: filePath,
                size: stat.size,
                type: file.isDirectory() ? "folder" : "file",
                createdAt: stat.birthtime.toDateString(),
            };
        })
    );

    return results;
}

module.exports = { organiseFiles, undoLastOrganise, listFiles };
