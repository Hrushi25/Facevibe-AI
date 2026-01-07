import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Test endpoint to list available models
app.get("/models", async (req, res) => {
  try {
    console.log("🔍 Fetching available models...");
    
    // Try to list models
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }
    
    const modelNames = data.models
      ?.filter(m => m.supportedGenerationMethods?.includes('generateContent'))
      .map(m => m.name) || [];
    
    res.json({ 
      available: modelNames,
      count: modelNames.length 
    });
  } catch (err) {
    console.error("❌ Error listing models:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/chat", async (req, res) => {
  try {
    const { message, stressLevel } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Try different model name formats
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are a calm wellness coach.

User stress level: ${stressLevel ?? "unknown"} (0 = calm, 1 = high stress)

User message:
"${message}"

Respond with empathy and one short calming suggestion.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ text });
  } catch (err) {
    console.error("❌ Gemini backend error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("✅ Gemini proxy running on http://localhost:3001");
});