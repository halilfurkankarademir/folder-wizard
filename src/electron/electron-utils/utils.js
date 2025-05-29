const { Worker } = require("worker_threads");
const log = require("electron-log");
const dns = require("dns");
const fs = require("fs-extra");
const path = require("path");

/**
 * Checks if the provided Gemini API key is valid
 * @param {string} apiKey - API key to be validated
 * @returns {Promise<boolean>} - True if the key is valid, false otherwise
 */
async function validateGeminiApiKey(apiKey) {
    try {
        log.info("Validating Gemini API key...");
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
        );
        if (!response.ok) {
            log.error("API key validation failed.");
            return false;
        }
        log.info("API key validation successful.");
        return true;
    } catch (error) {
        log.error("API key validation error:", error);
        return false;
    }
}

/**
 * Checks if the internet connection is available
 * @returns {Promise<boolean>} - True if the internet connection is available, false otherwise
 */
async function checkNetworkConnection() {
    try {
        log.info("Checking internet connection...");
        return new Promise((resolve) => {
            dns.lookup("google.com", { all: false }, (err) => {
                if (err) {
                    log.error("No internet connection.");
                    resolve(false);
                } else {
                    log.info("Internet connection is available.");
                    resolve(true);
                }
            });
        });
    } catch (error) {
        log.error("Internet connection check failed:", error);
        return false;
    }
}

/**
 * Checks if a file is in use
 * @param {string} filePath - Path of the file to check
 * @returns {Promise<boolean>} - True if the file is in use, false otherwise
 */
async function checkIfFileInUse(filePath) {
    try {
        const fileHandle = await fs.open(filePath, "r+");
        await fs.close(fileHandle);
        return false;
    } catch (error) {
        if (error.code === "EBUSY" || error.code === "EACCES") {
            log.error(`File is in use: ${filePath}`);
            return true;
        }
    }
}

/**
 * Checks if a directory is in use recursively
 * @param {string} dirPath - Path of the directory to check
 * @returns {Promise<boolean>} - True if the directory is in use, false otherwise
 */
async function checkIfFileInUseRecursively(dirPath) {
    const files = await fs.readdir(dirPath);
    let anyFilesInUse = false;

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = await fs.stat(filePath);

        if (stat.isDirectory()) {
            if (await checkIfFileInUseRecursively(filePath)) {
                anyFilesInUse = true;
            }
        } else if (stat.isFile()) {
            if (await checkIfFileInUse(filePath)) {
                anyFilesInUse = true;
            }
        }
    }
    return anyFilesInUse;
}

module.exports = {
    validateGeminiApiKey,
    checkNetworkConnection,
    checkIfFileInUseRecursively,
};
