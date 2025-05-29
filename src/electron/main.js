const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const log = require("electron-log");
const { setupIPCHandlers } = require("./ipc.js");

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
            preload: path.join(__dirname, "preload.js"),
            sandbox: true,
        },
    });

    try {
        if (isDev) {
            window.loadURL("http://localhost:5173");
        } else {
            window.loadFile(path.join(__dirname, "../../dist/index.html"));
        }
    } catch (loadError) {
        log.error("Failed to load the renderer:", loadError);
    }

    return window;
}

app.whenReady().then(() => {
    log.initialize();

    try {
        mainWindow = createWindow();
    } catch (error) {
        log.error("Window creation failed:", error);
    }

    if (mainWindow) {
        try {
            mainWindow.maximize();
        } catch (error) {
            log.error("Window maximization failed:", error);
        }
    }

    setupIPCHandlers(mainWindow);
    app.setAppUserModelId("com.folderwizard.app");

    if (isDev) {
        globalShortcut.register("CommandOrControl+D", () => {
            mainWindow.webContents.openDevTools();
        });
    }

    if (mainWindow) {
        mainWindow.on("closed", () => {
            mainWindow = null;
        });
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow = createWindow();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
