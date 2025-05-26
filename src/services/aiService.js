import { GoogleGenAI } from "@google/genai";
import { parseAIJsonResponse } from "../utils/helpers";

// Gets response from ai by using gemini
const getResponseFromAI = async (message) => {
    // Gets stored api key from electron app
    const apiKey = await window.electronAPI?.invoke("get-api-key");

    if (!apiKey) {
        console.error("API key not found");
        return;
    }

    const aiAgent = new GoogleGenAI({ apiKey });

    try {
        const response = await aiAgent.models.generateContent({
            model: "gemini-2.0-flash",
            contents: message.trim(),
        });
        const responseMessage = response.candidates[0].content.parts[0].text;
        const parsedResponse = parseAIJsonResponse(responseMessage);
        return parsedResponse;
    } catch (error) {
        console.error("An error accured to get response from ai");
    }
};

export default getResponseFromAI;
