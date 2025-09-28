
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Itinerary } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const itinerarySchema = {
  type: Type.OBJECT,
  properties: {
    tripTitle: { type: Type.STRING, description: "A creative and exciting title for the trip." },
    destination: { type: Type.STRING, description: "The primary destination city/country." },
    duration: { type: Type.INTEGER, description: "The total number of days for the trip." },
    itinerary: {
      type: Type.ARRAY,
      description: "A day-by-day plan for the entire trip.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER, description: "The day number (e.g., 1, 2, 3)." },
          title: { type: Type.STRING, description: "A short, catchy title for the day's theme." },
          activities: {
            type: Type.ARRAY,
            description: "A list of activities for the day.",
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "Suggested time for the activity (e.g., '9:00 AM', 'Afternoon')." },
                description: { type: Type.STRING, description: "A detailed description of the activity." },
                type: { 
                  type: Type.STRING, 
                  description: "The category of the activity.",
                  enum: ['Dining', 'Activity', 'Sightseeing', 'Travel', 'Accommodation']
                },
              },
              required: ["time", "description", "type"],
            },
          },
        },
        required: ["day", "title", "activities"],
      },
    },
  },
  required: ["tripTitle", "destination", "duration", "itinerary"],
};

export const generateItinerary = async (destination: string, duration: string, interests: string): Promise<Itinerary> => {
    const prompt = `Create a detailed vacation itinerary for a trip to ${destination} for ${duration} days. The traveler is interested in ${interests}. Please provide a creative trip title and a day-by-day plan with specific times, descriptions, and types for each activity. Ensure the plan is logical and engaging.`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: itinerarySchema,
            },
        });
        
        const text = response.text.trim();
        const parsedJson = JSON.parse(text);
        return parsedJson as Itinerary;
    } catch (error) {
        console.error("Error generating itinerary:", error);
        throw new Error("Failed to generate itinerary. The model may be unable to provide a plan for the requested destination or duration.");
    }
};

export const generateDestinationImage = async (destination: string, tripTitle: string): Promise<string> => {
    const prompt = `A beautiful, stunning, photorealistic, cinematic image of ${destination}, capturing the essence of a trip titled "${tripTitle}". High resolution, vibrant colors, iconic landmarks or scenery.`;
    
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
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
        throw new Error("Failed to generate a destination image.");
    }
};
