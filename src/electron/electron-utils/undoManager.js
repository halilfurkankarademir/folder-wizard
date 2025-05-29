class UndoManager {
    constructor() {
        this.undoStacks = new Map();
    }
    addUndoStack(id, undoStack, createdFolders) {
        this.undoStacks.set(id, { undoStack, createdFolders });
    }
    getUndoStack(id) {
        return this.undoStacks.get(id);
    }
    removeUndoStack(id) {
        this.undoStacks.delete(id);
    }
    hasUndoStack(id) {
        return this.undoStacks.has(id);
    }
}

module.exports = new UndoManager();
