const { Worker } = require("worker_threads");

function runWorker(workerPath, workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(workerPath, { workerData });
        worker.on("message", (result) => {
            resolve(result);
        });
        worker.on("error", (error) => {
            reject(error);
        });
        worker.on("exit", (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

module.exports = { runWorker };
