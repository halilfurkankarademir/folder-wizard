const fs = require("fs-extra");
const path = require("path");
const MoveFileCommand = require("../electron-utils/commands/MoveFileCommand.cjs");
const pLimit = require("p-limit");
const log = require("electron-log");
const { exec } = require("child_process");

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

    log.info("Organising files...");

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

        log.info("Organisation complete.");

        return { success: true };
    } catch (error) {
        log.error("Organisation failed:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Undoes the last organise operation
 * @returns {Promise<void>}
 */
async function undoLastOrganise() {
    log.info("Undoing last organise operation...");

    while (undoStack.length > 0) {
        const lastCommand = undoStack.pop();
        try {
            await lastCommand.undo();
        } catch (e) {
            log.error("Undo failed:", e);
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
            log.error("Undo failed:", error);
        }
    }

    createdFolders.length = 0;

    log.info("Undo complete.");
}

/**
 * Lists all the files in the given directory
 * @param {string} dir - Directory path to list files from
 * @returns {Promise<Array>} - List of files in the directory
 * @throws {Error} - If the maximum file count is exceeded
 * */
async function listFiles(dir) {
    log.info("Listing files...");

    let results = [];

    const files = await fs.readdir(dir, { withFileTypes: true });

    const fileCount = files.length;

    if (fileCount > ALLOWED_FILE_COUNT) {
        log.error("Maximum file count exceeded.");
        return { success: false, error: "maxFileCountExceeded" };
    }

    results = await Promise.all(
        files.map(async (file) => {
            const filePath = path.join(dir, file.name);
            // Stat of the file
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

    log.info("Listing complete.");

    return results;
}

/**
 * Opens folder of the given file
 * @param {string} filePath - File path to open
 */
async function openFile(filePath) {
    // Path of the file folder
    const folderPath = path.dirname(filePath);

    exec(`start "" "${folderPath}"`, (err) => {
        if (err) {
            log.error("File open error:", err);
        }
    });
}

module.exports = { organiseFiles, undoLastOrganise, listFiles, openFile };
