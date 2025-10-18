import * as fs from "fs";
import { GoogleGenAI } from "@google/genai";

// Blueprint reference: javascript_gemini
// Using Gemini for AI virtual try-on image generation
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateVirtualTryOn(
  userPhotoBase64: string,
  outfitDescription: string,
  lookName: string
): Promise<string> {
  try {
    const prompt = `Create a photorealistic virtual try-on image showing a person wearing athletic sportswear. 
    
Look Style: ${lookName}
Outfit Description: ${outfitDescription}

Generate a professional product photography style image of someone wearing this complete athletic outfit in a modern gym or urban fitness environment. The outfit should include all the described items. Use dramatic lighting with a sleek, premium aesthetic inspired by Adidas brand photography - bold, athletic, and sophisticated with black, white, and electric blue color scheme.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("No image generated");
    }

    const content = candidates[0].content;
    if (!content || !content.parts) {
      throw new Error("No content in response");
    }

    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return part.inlineData.data;
      }
    }

    throw new Error("No image data in response");
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error(`Failed to generate virtual try-on: ${error}`);
  }
}

export async function analyzeUserPhoto(photoBase64: string): Promise<string> {
  try {
    const contents = [
      {
        inlineData: {
          data: photoBase64,
          mimeType: "image/jpeg",
        },
      },
      `Analyze this photo and describe the person's body type, pose, and any relevant details for virtual outfit try-on. Be concise.`,
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: contents,
    });

    return response.text || "Unable to analyze photo";
  } catch (error) {
    console.error("Photo analysis error:", error);
    return "Photo analysis unavailable";
  }
}
