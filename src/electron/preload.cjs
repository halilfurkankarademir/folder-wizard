const { contextBridge, ipcRenderer } = require("electron");

// Connects the renderer to the main process
// Helps to communicate between the renderer and the main process
contextBridge.exposeInMainWorld("electronAPI", {
    /**
     * Sends a message to the main process
     * @param {string} channel - Channel name to send the message on
     * @param {any} data - Data to send
     * @returns {Promise<any>}
     */
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),
});
