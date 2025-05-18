const { ipcMain, dialog, shell, safeStorage } = require("electron");
const {
    organiseFiles,
    listFiles,
    undoLastOrganise,
} = require("./fileOrganizer.cjs");
const Store = require("electron-store").default;

const myStore = new Store();

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

    // Klasör seçme diyaloğu
    ipcMain.handle("open-folder-dialog", async () => {
        try {
            const result = await dialog.showOpenDialog(mainWindow, {
                properties: ["openDirectory"],
            });

            if (!result.canceled && result.filePaths.length > 0) {
                const folderPath = result.filePaths[0];
                const filesAndFolders = await listFiles(folderPath);

                return {
                    success: true,
                    path: folderPath,
                    data: filesAndFolders,
                };
            } else {
                return {
                    success: false,
                    message: "Kullanıcı klasör seçimini iptal etti.",
                };
            }
        } catch (error) {
            console.error("Klasör diyaloğu hatası:", error);
            return {
                success: false,
                error: error.message,
            };
        }
    });

    ipcMain.handle("organise-files", async (event, args) => {
        try {
            const { files, currentPath } = args;
            if (!files || !currentPath) {
                console.error("Missing parameters:", { files, currentPath });
                return {
                    success: false,
                    error: "Files or current path is missing",
                    details: { files, currentPath },
                };
            }

            const result = await organiseFiles(files, currentPath);

            return result;
        } catch (error) {
            return {
                success: false,
                error: error.message,
                details: { error, files, currentPath },
            };
        }
    });

    // Sets API key for gemini ai
    ipcMain.handle("set-api-key", async (event, apiKey) => {
        try {
            const isValidKey = await validateGeminiApiKey(apiKey);
            if (!isValidKey) {
                throw new Error("API key gecersiz.");
            }
            const encyrptedKey = safeStorage.encryptString(apiKey);
            myStore.set("apiKey", encyrptedKey);
            return { success: true };
        } catch (error) {
            console.error("API key set error:", error);
            return { success: false, error: error.message };
        }
    });

    // Opens external links
    ipcMain.handle("open-link", (event, link) => {
        shell.openExternal(link);
    });

    ipcMain.handle("get-api-key", async () => {
        const encryptedKey = myStore.get("apiKey");
        if (!encryptedKey) return null;
        const decryptedKey = safeStorage.decryptString(
            Buffer.from(encryptedKey, "base64")
        );
        return decryptedKey;
    });

    ipcMain.handle("undo-organisation", async () => {
        await undoLastOrganise();
        return { success: true };
    });
}

module.exports = { setupIPCHandlers };

// Checks if the Gemini API key is valid
async function validateGeminiApiKey(apiKey) {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
        );
        if (response.ok) {
            return true;
        } else {
            console.warn("API key geçersiz:", response.status);
            return false;
        }
    } catch (error) {
        console.error("API kontrol hatası:", error);
        return false;
    }
}
