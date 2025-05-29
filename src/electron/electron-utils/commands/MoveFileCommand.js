const fs = require("fs-extra");
const path = require("path");
const log = require("electron-log");
const { checkIfFileInUseRecursively } = require("../utils.js");

/**
 * It creates a new move file command
 * @constructor MoveFileCommand
 * @param {string} source - Source path of the file
 * @param {string} destination - Destination path of the file
 */
class MoveFileCommand {
    constructor(source, destination, dirPath) {
        this.dirPath = dirPath;
        this.source = source;
        this.destination = destination;
    }

    async do() {
        try {
            const isFileInUse = await checkIfFileInUseRecursively(this.dirPath);
            if (isFileInUse) {
                log.error("File is currently in use:", this.source);
                return { error: "fileInUse" };
            }

            await fs.ensureDir(path.dirname(this.destination));

            await fs.move(this.source, this.destination, { overwrite: true });

            return { success: true };
        } catch (error) {
            throw error;
        }
    }

    async undo() {
        await fs.ensureDir(path.dirname(this.source));
        await fs.move(this.destination, this.source, { overwrite: true });
    }
}

module.exports = MoveFileCommand;
