
import { GoogleGenAI, Type } from "@google/genai";
import type { HealthAnalysisData, HealthAnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const healthAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: 'A brief, neutral summary of potential health indicators based on the provided data. Start with a disclaimer that this is not a medical diagnosis.'
    },
    potentialRisks: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: 'A potential risk factor identified from the data.'
      },
      description: 'A list of 2-4 potential health risks based on the symptoms and lifestyle. Frame these as general risks, not diagnoses.'
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: 'An actionable lifestyle or wellness recommendation.'
      },
      description: 'A list of 3-5 actionable, general wellness and lifestyle recommendations. Do not suggest specific medications.'
    }
  },
  required: ['summary', 'potentialRisks', 'recommendations']
};

export const analyzeHealthData = async (
  data: HealthAnalysisData
): Promise<HealthAnalysisResult> => {
  const prompt = `
    Analyze the following health profile for a user seeking general wellness insights. 
    IMPORTANT: You are an AI assistant, not a medical professional. Your analysis must not be a medical diagnosis. 
    Begin your summary with this exact sentence: "This is a general wellness analysis based on the information you provided and is not a substitute for professional medical advice."
    
    User Profile:
    - Age: ${data.age}
    - Gender: ${data.gender}
    - Reported Symptoms: ${data.symptoms}
    - Lifestyle Factors: ${data.lifestyle.join(', ')}
    - Relevant Medical History: ${data.history || 'None provided'}

    Based on this information, provide a structured analysis in JSON format. Identify potential general health risks and provide common-sense, non-prescriptive lifestyle recommendations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: healthAnalysisSchema,
        temperature: 0.5,
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    // Basic validation to ensure the result matches the expected structure
    if (result && result.summary && Array.isArray(result.potentialRisks) && Array.isArray(result.recommendations)) {
       return result as HealthAnalysisResult;
    } else {
        throw new Error("Invalid response structure from API.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get health analysis. Please try again later.");
  }
};
