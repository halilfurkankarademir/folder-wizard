const log = require("electron-log");
const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");
const MoveFileCommand = require("./commands/MoveFileCommand");

// Allowed max file count to be organised
const ALLOWED_FILE_COUNT = 100;

/**
 * Lists all the files in the given directory
 * @param {string} dir - Directory path to list files from
 * @returns {Promise<Array>} - List of files in the directory
 * @throws {Error} - If the maximum file count is exceeded
 * */
async function listFiles(dir) {
    console.time("listFiles");

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

    console.timeEnd("listFiles");

    return results;
}

/**
 * Undoes the last organise operation
 * @returns {Promise<void>}
 */
async function undoLastOrganise(undoStack, createdFolders) {
    console.time("undoLastOrganise");

    log.info("Undoing last organise operation...");

    while (undoStack.length > 0) {
        const lastCommandData = undoStack.pop();
        try {
            const command = new MoveFileCommand(
                lastCommandData.source,
                lastCommandData.destination,
                lastCommandData.dirPath
            );
            await command.undo();
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

    console.timeEnd("undoLastOrganise");

    log.info("Undo complete.");

    return { success: true };
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

module.exports = { listFiles, openFile, undoLastOrganise };
