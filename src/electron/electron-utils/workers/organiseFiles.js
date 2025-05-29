const { parentPort, workerData } = require("worker_threads");
const log = require("electron-log");
const path = require("path");
const MoveFileCommand = require("../commands/MoveFileCommand.js");
const pLimit = require("p-limit");

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

    console.time("organiseFiles");

    log.info("Organising files...");

    try {
        const movePromises = files.map((file) =>
            limit(async () => {
                const { fileName, targetFolder } = file;

                console.log(
                    `Moving file: ${fileName} to folder: ${targetFolder}`
                );

                // Target folder path in the current folder exp (D:\folderName)
                const targetFolderPath = path.join(currentPath, targetFolder);

                console.log(`Target folder path: ${targetFolderPath}`);

                // Source file path in the current folder exp (D:\fileName)
                const source = path.join(currentPath, fileName);

                console.log(`Source file path: ${source}`);
                // Destination file path in the target folder exp (D:\folderName\fileName)
                const destination = path.join(
                    currentPath,
                    targetFolder,
                    fileName
                );

                console.log(`Destination file path: ${destination}`);

                // Creates new move file command
                const command = new MoveFileCommand(
                    source,
                    destination,
                    currentPath
                );

                console.log(`Executing move command for file: ${fileName}`);

                // Performs the move operation
                const result = await command.do();

                if (result.error) {
                    throw new Error(result.error);
                }

                console.log(`File moved successfully: ${fileName}`);
                // Adds the command to the undo stack for later if user wants to undo operation
                undoStack.push({ source, destination, dirPath: currentPath });
                // Adds the target folder to the list of created folders
                createdFolders.push(targetFolderPath);
            })
        );

        // Wait for all move operations to complete
        await Promise.all(movePromises);

        log.info("Organisation complete.");

        console.timeEnd("organiseFiles");

        return { success: true, undoStack, createdFolders };
    } catch (error) {
        log.error("Organisation failed:", error);
        return { success: false, error: error.message };
    }
}

organiseFiles(workerData.files, workerData.currentPath)
    .then((result) => {
        parentPort.postMessage(result);
    })
    .catch((error) => {
        parentPort.postMessage({ success: false, error: error.message });
    });
