const fs = require("fs-extra");
const path = require("path");

/**
 * It creates a new move file command
 * @constructor MoveFileCommand
 * @param {string} source - Source path of the file
 * @param {string} destination - Destination path of the file
 */
class MoveFileCommand {
    constructor(source, destination) {
        this.source = source;
        this.destination = destination;
    }

    async do() {
        await fs.ensureDir(path.dirname(this.destination));
        await fs.move(this.source, this.destination, { overwrite: true });
    }

    async undo() {
        await fs.ensureDir(path.dirname(this.source));
        await fs.move(this.destination, this.source, { overwrite: true });
    }
}

module.exports = MoveFileCommand;
