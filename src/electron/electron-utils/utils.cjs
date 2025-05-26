const log = require("electron-log");
const dns = require("dns");

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

module.exports = { validateGeminiApiKey, checkNetworkConnection };
