const { ipcMain, dialog, shell } = require("electron");
const fs = require("fs");
const path = require("path");

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

    ipcMain.on("fullscreen-window", () => {
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

    // Klasör içeriğini listeleme
    ipcMain.on("list-folder", async (event, folderPath) => {
        try {
            const items = fs.readdirSync(folderPath, { withFileTypes: true });
            const filesAndFolders = items.map((item) => ({
                name: item.name,
                path: path.join(folderPath, item.name),
                isDirectory: item.isDirectory(),
                isFile: item.isFile(),
            }));

            mainWindow.webContents.send("list-folder-response", {
                success: true,
                data: filesAndFolders,
                path: folderPath,
            });
        } catch (error) {
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
                mainWindow.webContents.send("folder-dialog-response", {
                    success: true,
                    path: result.filePaths[0],
                });
            } else {
                mainWindow.webContents.send("folder-dialog-response", {
                    success: false,
                    error: "İşlem iptal edildi",
                });
            }
        } catch (error) {
            mainWindow.webContents.send("folder-dialog-response", {
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
    ipcMain.on("make-folder", async (event, folderPath) => {
        try {
            fs.mkdirSync(folderPath, { recursive: true });
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

    ipcMain.on("open-github", () => {
        shell.openExternal(
            "https://github.com/halilfurkankarademir/folder-wizard"
        );
    });

    ipcMain.on("open-linkedin", () => {
        shell.openExternal("https://linkedin.com/in/halilfurkankarademir");
    });
}

module.exports = { setupIPCHandlers };
