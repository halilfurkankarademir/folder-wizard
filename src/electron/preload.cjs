const { contextBridge, ipcRenderer } = require("electron");

let validSendChannels = [
    "toMain",
    "list-folder",
    "move-file",
    "make-folder",
    "delete-file",
    "open-folder-dialog",
];

let validReceiveChannels = [
    "fromMain",
    "list-folder-response",
    "move-file-response",
    "make-folder-response",
    "delete-file-response",
    "folder-dialog-response",
];

contextBridge.exposeInMainWorld("electronAPI", {
    // Main proccess ile iletisim kurma fonksiyonu
    send: (channel, data) => {
        if (validSendChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    // Main proccessten gelen verileri dinlemek icin
    receive: (channel, func) => {
        if (validReceiveChannels.includes(channel)) {
            const subscribedFunc = (event, ...args) => func(...args);
            ipcRenderer.on(channel, subscribedFunc);
            return () => {
                ipcRenderer.removeListener(channel, subscribedFunc);
            };
        }
        return () => {};
    },

    // Kolay kullanım için hazır fonksiyonlar
    listFolder: (folderPath) => {
        ipcRenderer.send("list-folder", folderPath);
    },

    openFolderDialog: () => {
        ipcRenderer.send("open-folder-dialog");
    },

    minimizeWindow: () => {
        ipcRenderer.send("minimize-window");
    },

    maximizeWindow: () => {
        ipcRenderer.send("maximize-window");
    },

    closeWindow: () => {
        ipcRenderer.send("close-window");
    },

    openLink: (link) => {
        ipcRenderer.send("open-link", link);
    },

    createFolder: (folderPath, folderName) => {
        ipcRenderer.send("make-folder", folderPath, folderName);
    },

    organiseFiles: (files, currentPath) => {
        console.log(files, currentPath);
        ipcRenderer.send("organise-files", files, currentPath);
    },
});
