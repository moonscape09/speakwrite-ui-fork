import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { text, sourceLanguage, targetLanguage } = req.body;
  if (!text || !sourceLanguage || !targetLanguage) {
    return res.status(400).json({ error: "Missing text, source language, or target language" });
  }

  // Define supported language pairs
  const supportedLanguagePairs = [
    { source: "en", target: "es" }, 
    { source: "en", target: "fr" },
    { source: "en", target: "de" }, 
    { source: "es", target: "fr" }, 
    { source: "es", target: "en" },
    { source: "es", target: "de" },
    { source: "fr", target: "de" },
    { source: "fr", target: "en" },
    { source: "fr", target: "es" },
    { source: "de", target: "en" },
    { source: "de", target: "es" },
    { source: "de", target: "fr" },
  ];

  // Check if the language pair is supported
  const isValidLanguagePair = supportedLanguagePairs.some(
    (pair) => pair.source === sourceLanguage && pair.target === targetLanguage
  );
  if (!isValidLanguagePair) {
    return res.status(400).json({ error: "Unsupported language pair" });
  }

  console.log(sourceLanguage, targetLanguage);
  try {

    // Dynamically choose the model based on source and target languages
    const modelName = `Helsinki-NLP/opus-mt-${sourceLanguage}-${targetLanguage}`;

    // Send translation request to Hugging Face API
    const response = await fetch(`https://api-inference.huggingface.co/models/${modelName}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ translation: data[0].translation_text });
    } else {
      // If response isn't successful, return error from API
      res.status(500).json({ error: "Translation failed", details: data });
    }
  } catch (error) {
    res.status(500).json({ error: "Translation failed", details: error.message });
  }
}
