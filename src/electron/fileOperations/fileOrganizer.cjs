const fs = require("fs-extra");
const path = require("path");
const MoveFileCommand = require("../commands/MoveFileCommand.cjs");
const pLimit = require("p-limit");

// Allowed max file count to be organised
const ALLOWED_FILE_COUNT = 100;

// Allow 5 files to be moved at a time
const limit = pLimit(5);

// Stack of undo operations
const undoStack = [];

// List of created folders
const createdFolders = [];

/**
 * Moves all files to their specified target folders within the given current path.
 * @param {Array<{fileName:string, targetFolder:string}>} files - All of the files to be moved
 * @param {string} currentPath - Current path of the folder
 */
async function organiseFiles(files, currentPath) {
    if (!files || !currentPath) {
        return { success: false, error: "No files or current path provided." };
    }

    try {
        const movePromises = files.map((file) =>
            limit(async () => {
                const { fileName, targetFolder } = file;

                // Target folder path in the current folder exp (D:\folderName)
                const targetFolderPath = path.join(currentPath, targetFolder);

                // Source file path in the current folder exp (D:\fileName)
                const source = path.join(currentPath, fileName);
                // Destination file path in the target folder exp (D:\folderName\fileName)
                const destination = path.join(
                    currentPath,
                    targetFolder,
                    fileName
                );

                // Creates new move file command
                const command = new MoveFileCommand(source, destination);
                // Performs the move operation
                await command.do();
                // Adds the command to the undo stack for later if user wants to undo operation
                undoStack.push(command);
                // Adds the target folder to the list of created folders
                createdFolders.push(targetFolderPath);
            })
        );

        // Wait for all move operations to complete
        await Promise.all(movePromises);

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

    // Remove created folders from the organised folders
    const uniqueFolders = [...new Set(createdFolders)].reverse();

    // Checks file count for each folder and deletes if empty
    for (const folder of uniqueFolders) {
        try {
            const files = await fs.readdir(folder);
            if (files.length === 0) {
                await fs.rmdir(folder);
            }
        } catch (error) {
            console.error("Undo failed for a folder:", error);
        }
    }

    createdFolders.length = 0;

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
