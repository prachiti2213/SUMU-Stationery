import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not set in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateBlogPost = async (topic: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Error: API Key missing. Cannot generate content.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a professional, engaging, and SEO-friendly blog post for a premium stationery brand named "SUMU Stationery". The topic is: "${topic}". The tone should be elegant, knowledgeable, and inspiring. Keep it around 300 words. Format with paragraphs.`,
    });
    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please try again.";
  }
};

export const enhanceProductDescription = async (productName: string, features: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Error: API Key missing.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a compelling, premium product description for a pencil named "${productName}". Key features: ${features}. Target audience: professionals and artists. Keep it under 50 words.`,
    });
    return response.text || "Failed to generate description.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating description.";
  }
};
