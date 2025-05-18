const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const { setupIPCHandlers } = require("./ipcHandlers.cjs");

let mainWindow;

const isDev = process.env.NODE_ENV === "development";

const iconPath = path.join(__dirname, "../assets/images/logo.png");

function createWindow() {
    const window = new BrowserWindow({
        autoHideMenuBar: true,
        icon: iconPath,
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
        window.loadURL("http://localhost:5173");
    } else {
        window.loadFile(path.join(__dirname, "../../dist/index.html"));
    }

    return window;
}

app.whenReady().then(() => {
    mainWindow = createWindow();

    mainWindow.webContents.openDevTools();

    // Initialize ipc handler functions
    setupIPCHandlers(mainWindow);

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            mainWindow = createWindow();
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
