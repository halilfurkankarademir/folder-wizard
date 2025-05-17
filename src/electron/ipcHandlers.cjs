const { ipcMain, dialog, shell } = require("electron");
const fs = require("fs");
const path = require("path");
const {
    createFolder,
    organiseFiles,
    organiseFilesWithMove,
    listFiles,
} = require("./fileOrganizer.cjs");

async function setupIPCHandlers(mainWindow) {
    // Window controls
    ipcMain.on("minimize-window", () => {
        if (mainWindow) {
            mainWindow.minimize();
        }
    });

    ipcMain.on("maximize-window", () => {
        if (mainWindow) {
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize();
            } else {
                mainWindow.maximize();
            }
        }
    });

    ipcMain.on("close-window", () => {
        if (mainWindow) {
            mainWindow.close();
        }
    });

    // Show
    ipcMain.on("list-folder", async (event, folderPath) => {
        try {
            const filesAndFolders = await listFiles(folderPath);

            mainWindow.webContents.send("list-folder-response", {
                success: true,
                data: filesAndFolders,
                path: folderPath,
            });
        } catch (error) {
            console.error("Klasör okuma hatası:", error);
            mainWindow.webContents.send("list-folder-response", {
                success: false,
                error: error.message,
                path: folderPath,
            });
        }
    });

    // Klasör seçme diyaloğu
    ipcMain.on("open-folder-dialog", async (event) => {
        try {
            const result = await dialog.showOpenDialog(mainWindow, {
                properties: ["openDirectory"],
            });

            if (!result.canceled && result.filePaths.length > 0) {
                const folderPath = result.filePaths[0];

                const filesAndFolders = await listFiles(folderPath);

                mainWindow.webContents.send("folder-dialog-response", {
                    success: true,
                    path: folderPath,
                    data: filesAndFolders,
                });
            } else {
                mainWindow.webContents.send("folder-dialog-response", {
                    success: false,
                });
            }
        } catch (error) {
            console.error("Klasör diyaloğu hatası:", error);
            mainWindow.webContents.send("folder-dialog-response", {
                success: false,
                error: error.message,
            });
        }
    });

    ipcMain.on("organise-files", async (event, files, currentPath) => {
        try {
            await organiseFiles(files, currentPath);
            mainWindow.webContents.send("organise-files-response", {
                success: true,
            });
        } catch (error) {
            mainWindow.webContents.send("organise-files-response", {
                success: false,
                error: error.message,
            });
        }
    });

    // Dosya taşıma
    ipcMain.on("move-file", async (event, { source, destination }) => {
        try {
            fs.renameSync(source, destination);
            mainWindow.webContents.send("move-file-response", {
                success: true,
                source,
                destination,
            });
        } catch (error) {
            mainWindow.webContents.send("move-file-response", {
                success: false,
                error: error.message,
            });
        }
    });

    // Klasör oluşturma
    ipcMain.on("make-folder", async (event, folderPath, folderName) => {
        try {
            await createFolder(folderPath, folderName);
            mainWindow.webContents.send("make-folder-response", {
                success: true,
                path: folderPath,
            });
        } catch (error) {
            mainWindow.webContents.send("make-folder-response", {
                success: false,
                error: error.message,
            });
        }
    });

    // Dosya silme
    ipcMain.on("delete-file", async (event, filePath) => {
        try {
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                fs.rmdirSync(filePath, { recursive: true });
            } else {
                fs.unlinkSync(filePath);
            }
            mainWindow.webContents.send("delete-file-response", {
                success: true,
                path: filePath,
            });
        } catch (error) {
            mainWindow.webContents.send("delete-file-response", {
                success: false,
                error: error.message,
            });
        }
    });

    // Harici linkler
    ipcMain.on("open-link", (event, link) => {
        shell.openExternal(link);
    });
}

module.exports = { setupIPCHandlers };
