const { app, BrowserWindow } = require("electron");
const path = require("path");
const { setupIPCHandlers } = require("./ipcHandlers.cjs");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        title: "Folder Wizard",
        frame: false,
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.cjs"),
        },
    });

    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
        mainWindow.loadURL("http://localhost:5173");
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, "../../dist/index.html"));
    }

    return mainWindow;
}

app.whenReady().then(() => {
    createWindow();

    setupIPCHandlers(mainWindow);

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
