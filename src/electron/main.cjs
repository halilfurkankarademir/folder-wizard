const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const { setupIPCHandlers } = require("./ipcHandlers.cjs");

let mainWindow;
const isDev = process.env.NODE_ENV === "development";

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

    if (isDev) {
        mainWindow.loadURL("http://localhost:5173");
    } else {
        mainWindow.loadFile(path.join(__dirname, "../../dist/index.html"));
    }

    return mainWindow;
}

app.whenReady().then(() => {
    createWindow();

    // Initialize ipc handler functions
    setupIPCHandlers(mainWindow);

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    // It opens dev tools when CTRL+D pressed.
    if (isDev) {
        globalShortcut.register("CommandOrControl+D", () => {
            mainWindow.webContents.openDevTools();
        });
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
