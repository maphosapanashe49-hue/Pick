
import { GoogleGenAI, Type } from "@google/genai";
import type { StoryPart } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const storyPartSchema = {
    type: Type.OBJECT,
    properties: {
        scene: {
            type: Type.STRING,
            description: "A detailed, engaging, and atmospheric description of the current scene. Should be 2-4 sentences long."
        },
        imagePrompt: {
            type: Type.STRING,
            description: "A detailed DALL-E style prompt for an image that visually represents the scene. Focus on atmosphere, key elements, and a dark fantasy art style. e.g., 'An ancient, moss-covered monolith under a stormy sky, digital painting, epic fantasy.'"
        },
        choices: {
            type: Type.ARRAY,
            description: "An array of exactly 3 short, action-oriented choices for the player.",
            items: {
                type: Type.STRING
            }
        },
        isGameOver: {
            type: Type.BOOLEAN,
            description: "Set to true only if the story has reached a definitive end (e.g., death, or major success). Otherwise, false."
        }
    },
    required: ["scene", "imagePrompt", "choices", "isGameOver"]
};


export const generateStoryPart = async (prompt: string): Promise<StoryPart> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: "You are a master storyteller for a dark fantasy text-based adventure game. Your goal is to create a compelling, branching narrative. Always respond with a valid JSON object matching the provided schema. The story should be immersive and the choices should be meaningful.",
                responseMimeType: "application/json",
                responseSchema: storyPartSchema,
                temperature: 0.8,
            }
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        
        // Basic validation
        if (!parsedJson.scene || !Array.isArray(parsedJson.choices)) {
            throw new Error("Invalid JSON structure received from API.");
        }

        return parsedJson as StoryPart;

    } catch (error) {
        console.error("Error generating story part:", error);
        throw new Error("Failed to generate story from Gemini API.");
    }
};

export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `${prompt}, dark fantasy, atmospheric, cinematic lighting, detailed, epic`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating image:", error);
        // Return a placeholder or throw an error
        throw new Error("Failed to generate image from Gemini API.");
    }
};
