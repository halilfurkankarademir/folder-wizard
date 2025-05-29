const { ipcMain, dialog, shell, safeStorage } = require("electron");
const {
    validateGeminiApiKey,
    checkNetworkConnection,
} = require("./electron-utils/utils.js");
const log = require("electron-log");
const path = require("path");
const undoManager = require("./electron-utils/undoManager.js");
const { runWorker } = require("./electron-utils/workers/runWorker.js");
const {
    undoLastOrganise,
    openFile,
    listFiles,
} = require("./electron-utils/fileOperations.js");

// Electron store for storing user settings
const Store = require("electron-store");
const myStore = new Store();

let lastFolderPath;

/**
 * Initializes ipc handler functions for the application
 * @param {BrowserWindow} mainWindow - Main window of the application
 */
async function setupIPCHandlers(mainWindow) {
    // Window controls
    ipcMain.handle("minimize-window", () => {
        if (mainWindow) {
            mainWindow.minimize();
        }
    });

    ipcMain.handle("toggle-fullscreen", () => {
        if (mainWindow) {
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize();
            } else {
                mainWindow.maximize();
            }
        }
    });

    ipcMain.handle("close-window", () => {
        if (mainWindow) {
            mainWindow.close();
        }
    });

    // Folder selection dialog
    ipcMain.handle("open-folder-dialog", async () => {
        try {
            log.info("Opening folder dialog...");
            const dialogResult = await dialog.showOpenDialog(mainWindow, {
                properties: ["openDirectory"],
            });

            if (dialogResult.canceled) {
                log.info("User cancelled folder selection.");
                return {
                    success: false,
                    error: "userCancelledFolderSelection",
                };
            }

            const folderPath = dialogResult.filePaths[0];

            const filesAndFolders = await listFiles(folderPath);

            return {
                success: true,
                path: folderPath,
                data: filesAndFolders,
            };
        } catch (error) {
            log.error("Folder dialog error:", error);
            return {
                success: false,
                error: error.message,
            };
        }
    });

    // Organise files
    ipcMain.handle("organise-files", async (event, args) => {
        try {
            const workerPath = path.join(
                __dirname,
                "./electron-utils/workers/organiseFiles.js"
            );
            const result = await runWorker(workerPath, args);

            // Adds undo stack to undo manager (undo operation id will be the current path = args.currentPath)
            if (result.success && result.undoStack && result.createdFolders) {
                undoManager.addUndoStack(
                    args.currentPath,
                    result.undoStack,
                    result.createdFolders
                );
            }

            // Updates last folder path
            lastFolderPath = args.currentPath;

            return result;
        } catch (error) {
            log.error("Organise files error:", error);
            return { success: false, error: error.message };
        }
    });

    // Undos last organise operation
    ipcMain.handle("undo-organisation", async () => {
        try {
            // Gets last undo stack from undo manager
            const undoData = undoManager.getUndoStack(lastFolderPath);

            if (!undoData) {
                return { success: false, error: "No undo data found." };
            }

            const result = await undoLastOrganise(
                undoData.undoStack,
                undoData.createdFolders
            );

            if (result.success) {
                undoManager.removeUndoStack(lastFolderPath);
            }

            return result;
        } catch (error) {
            log.error("Undo last organise error:", error);
            return { success: false, error: error.message };
        }
    });

    // Sets API key for Gemini AI
    ipcMain.handle("set-api-key", async (event, apiKey) => {
        try {
            log.info("Setting API key...");
            const isValidKey = await validateGeminiApiKey(apiKey);
            if (!isValidKey) {
                throw new Error("API key is invalid.");
            }

            const encryptedKey = safeStorage.encryptString(apiKey);
            myStore.set("apiKey", encryptedKey.toString("base64"));
            log.info("API key set successfully.");
            return { success: true };
        } catch (error) {
            log.error("API key set error:", error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle("get-api-key", async () => {
        log.info("Getting API key...");
        const encryptedKey = myStore.get("apiKey");
        if (!encryptedKey) return null;

        if (safeStorage.isEncryptionAvailable()) {
            try {
                const decryptedKey = safeStorage.decryptString(
                    Buffer.from(encryptedKey, "base64")
                );
                return decryptedKey;
            } catch (error) {
                log.error("API key decryption error:", error);
                return null;
            }
        } else {
            log.error("Encryption is not available on this platform.");
            return null;
        }
    });

    // Deletes api key if exists stored in electron store
    ipcMain.handle("delete-api-key", async () => {
        log.info("Deleting API key...");
        try {
            myStore.delete("apiKey");
            log.info("API key deleted successfully.");
            return { success: true };
        } catch (error) {
            log.error("API key delete error:", error);
            return { success: false, error: error.message };
        }
    });

    // Opens external links
    ipcMain.handle("open-link", (event, link) => {
        log.info(`Opening link: ${link}`);
        shell.openExternal(link);
    });

    // Opens files
    ipcMain.handle("open-file", async (event, filePath) => {
        try {
            log.info(`Opening file: ${filePath}`);

            const result = await openFile(filePath);

            return result;
        } catch (error) {
            log.error("File open error:", error);
            return { success: false, error: error.message };
        }
    });

    // Checks if the internet connection is available
    ipcMain.handle("check-network-connection", async () => {
        log.info("Checking network connection...");
        return await checkNetworkConnection();
    });
}

module.exports = { setupIPCHandlers };
