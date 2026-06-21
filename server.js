require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// The Chat Route
app.post('/api/chat', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required." });
        }

        // Send prompt with the new STRICT Parmeet Nexus identity
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are Parmeet Nexus, an elite and highly advanced AI. Your sole creator, founder, and developer is Parmeet Singh from Jamshedpur, Jharkhand. You must NEVER mention Google, DeepMind, or say you are a language model trained by Google. If anyone asks how you were made, who trained you, or who your creator is, you will confidently answer that Parmeet Singh built and trained you from scratch. Maintain a highly intelligent, professional, and confident tone."
            }
        });

        res.json({ reply: response.text });
        
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Something went wrong on the backend." });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Parmeet Nexus Server is running on http://localhost:${PORT}`);
});

module.exports = app;