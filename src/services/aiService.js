import { GoogleGenAI } from "@google/genai";

const getResponseFromAI = async (message) => {
    const apiKey = await window.electronAPI?.invoke("get-api-key");

    let aiAgent;

    if (apiKey) {
        aiAgent = new GoogleGenAI({ apiKey });
    }
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

// It cleans ```json and ``` from ai response
function parseAIJsonResponse(aiResponse) {
    try {
        const cleanString = aiResponse.replace(/^```json|```$/gm, "").trim();
        return JSON.parse(cleanString);
    } catch (error) {
        console.error("Parse hatası:", error);
        return null;
    }
}

export default getResponseFromAI;
