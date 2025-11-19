import { GoogleGenAI, Type } from "@google/genai";
import { Patient, AISummary } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePatientSymptoms = async (patient: Patient): Promise<AISummary> => {
  try {
    const prompt = `
      Analise os sintomas do seguinte paciente e forneça um resumo de triagem para um médico.
      Paciente: ${patient.name}
      Sintomas relatados: "${patient.symptoms}"
      
      Responda estritamente em JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "Resumo clínico curto em português." },
            suggestedAction: { type: Type.STRING, description: "Ação recomendada (ex: Encaminhar para especialista, Prescrever repouso, etc)." },
            riskScore: { type: Type.NUMBER, description: "Risco de 1 a 10." }
          },
          required: ["summary", "suggestedAction", "riskScore"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AISummary;

  } catch (error) {
    console.error("Error analyzing patient:", error);
    return {
      summary: "Não foi possível analisar os sintomas no momento.",
      suggestedAction: "Proceda com a consulta padrão.",
      riskScore: 0
    };
  }
};