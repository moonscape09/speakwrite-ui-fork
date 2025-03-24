import { useState } from "react";

export default function TranslateButton({ content, setContent }) {
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("German");
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [error, setError] = useState(null);

  // Available languages
  const languages = {
    English: "en",
    Spanish: "es",
    French: "fr",
    German: "de",
  };

  const [currentTranslation, setCurrentTranslation] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setSourceLanguage("English"); // Reset source language to English when text changes
  };

  const handleTranslate = async () => {
    if (!content) return;
    setIsTranslating(true);
    setError(null);

    const maxRetries = 10; // Max number of retries
    let retries = 0;
    let translationSuccess = false;

    while (retries < maxRetries && !translationSuccess) {
      try {
        setTimeout(() => {
          console.log("This message will appear after 3 seconds.");
        }, 500);
        const textToTranslate = currentTranslation || content;

        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: textToTranslate,
            sourceLanguage: languages[sourceLanguage],
            targetLanguage: languages[selectedLanguage],
          }),
        });
        
        const data = await response.json();

        if (data.translation) {
          setCurrentTranslation(data.translation);
          setContent(data.translation);
          setSourceLanguage(selectedLanguage);
          translationSuccess = true; // Optionally update source language to target language
        } else {
          console.error("Translation failed:", data.error);
        }
      } catch (error) {
        console.error("Error during translation:", error);
      }
    }
    setIsTranslating(false);
  };

  return (
    <div className="flex space-x-2">
      {/* Source Language Selector */}
      <select
        value={sourceLanguage}
        onChange={(e) => setSourceLanguage(e.target.value)}
        className="border p-2 rounded"
      >
        {Object.keys(languages).map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      {/* Target Language Selector */}
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="border p-2 rounded"
      >
        {Object.keys(languages).map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      {/* Translate Button */}
      <button
        onClick={handleTranslate}
        disabled={isTranslating}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {isTranslating ? "Translating..." : "Translate"}
      </button>
    </div>
  );
}
