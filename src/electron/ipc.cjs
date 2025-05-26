const { ipcMain, dialog, shell, safeStorage } = require("electron");
const {
    organiseFiles,
    listFiles,
    undoLastOrganise,
    openFile,
} = require("./electron-utils/fileOrganizer.cjs");
const { validateGeminiApiKey } = require("./electron-utils/utils.cjs");
const log = require("electron-log");

// Electron store for storing user settings
const Store = require("electron-store").default;
const myStore = new Store();

/**
 * Initializes ipc handler functions for the application
 * @param {BrowserWindow} mainWindow - Main window of the application
 */
async function setupIPCHandlers(mainWindow) {
    // Window controls
    ipcMain.handle("minimize-window", () => {
        log.info("Minimizing window...");
        if (mainWindow) {
            mainWindow.minimize();
        }
    });

    ipcMain.handle("toggle-fullscreen", () => {
        log.info("Toggling fullscreen...");
        if (mainWindow) {
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize();
            } else {
                mainWindow.maximize();
            }
        }
    });

    ipcMain.handle("close-window", () => {
        log.info("Closing window...");
        if (mainWindow) {
            mainWindow.close();
        }
    });

    // Folder selection dialog
    ipcMain.handle("open-folder-dialog", async () => {
        try {
            log.info("Opening folder dialog...");
            const result = await dialog.showOpenDialog(mainWindow, {
                properties: ["openDirectory"],
            });

            if (result.canceled) {
                log.info("User cancelled folder selection.");
                return {
                    success: false,
                    error: "userCancelledFolderSelection",
                };
            }

            if (!result.canceled && result.filePaths.length > 0) {
                const folderPath = result.filePaths[0];
                const filesAndFolders = await listFiles(folderPath);

                return {
                    success: true,
                    path: folderPath,
                    data: filesAndFolders,
                };
            } else {
                log.info("User cancelled folder selection.");
                return {
                    success: false,
                    message: "User cancelled folder selection.",
                };
            }
        } catch (error) {
            log.error("Folder dialog error:", error);
            return {
                success: false,
                error: error.message,
            };
        }
    });

    // Organises files
    ipcMain.handle("organise-files", async (event, args) => {
        try {
            const { files, currentPath } = args;
            if (!files || !currentPath) {
                log.error("Missing parameters:", { files, currentPath });
                return {
                    success: false,
                    error: "Files or current path is missing",
                    details: { files, currentPath },
                };
            }

            const result = await organiseFiles(files, currentPath);

            return result;
        } catch (error) {
            log.error("Organise files error:", error);
            return {
                success: false,
                error: error.message,
                details: { error, files, currentPath },
            };
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
    ipcMain.handle("open-file", (event, filePath) => {
        log.info(`Opening file: ${filePath}`);
        openFile(filePath);
    });

    // Undos last organise operation
    ipcMain.handle("undo-organisation", async () => {
        log.info("Undoing last organise operation...");
        await undoLastOrganise();
        return { success: true };
    });
}

module.exports = { setupIPCHandlers };
