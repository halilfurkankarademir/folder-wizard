const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const log = require("electron-log");
const { setupIPCHandlers } = require("./ipc.cjs");

let mainWindow;

const isDev = process.env.NODE_ENV === "development";
const iconPath = path.join(__dirname, "../assets/images/logo.ico");

/**
 * Creates a new browser window
 * @returns {BrowserWindow}
 */
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
            allowRunningInsecureContent: false,
            preload: path.join(__dirname, "preload.cjs"),
            sandbox: true,
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
    // Creates a new browser window
    mainWindow = createWindow();

    // Maximizes the window when it is created
    mainWindow.maximize();

    // Initializes ipc handler functions
    setupIPCHandlers(mainWindow);

    // Initializes the logger
    log.initialize();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            mainWindow = createWindow();
        }
    });

    // It opens dev tools when CTRL+D pressed in development mode.
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
