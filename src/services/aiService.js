import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from 'expo-file-system';

const GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_KEY);

async function callGemini(modelName, base64Image, prompt) {
  const model = genAI.getGenerativeModel({ model: modelName });
  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    },
  ]);
  const response = await result.response;
  return response.text();
}

export async function identifyNature(imageUri) {
  try {
    // Read image as base64
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const prompt = `
      أنت خبير في الطبيعة لتطبيق أطفال اسمه "كاشف". 
      حلل هذه الصورة وأخبرني ماذا ترى (نبات، حشرة، حيوان، أو مظهر طبيعي).
      يجب أن يكون الرد بتنسيق JSON حصراً كالتالي:
      {
        "nameAr": "اسم الشيء بالعربية",
        "emoji": "إيموجي مناسب",
        "rarity": "common أو rare أو epic",
        "xp": رقم بين 100 و 500,
        "descriptionAr": "وصف قصير ومشجع للأطفال عن هذا الشيء",
        "audioTextAr": "رسالة صوتية ترحيبية قصيرة (مثال: أهلاً يا بطل! لقد وجدت...) "
      }
    `;

    let text;
    try {
      // Try latest flash model
      text = await callGemini("gemini-1.5-flash", base64Image, prompt);
    } catch (e) {
      console.log("Gemini 1.5 Flash failed, trying Pro Vision...", e.message);
      // Fallback to pro vision
      text = await callGemini("gemini-pro-vision", base64Image, prompt);
    }
    
    // Clean JSON from response
    const jsonStr = text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("AI Identify Error:", error);
    return null;
  }
}
