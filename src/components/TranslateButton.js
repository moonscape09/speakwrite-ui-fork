import { useState } from "react";
import { Languages } from "lucide-react"; // or any icon you prefer, e.g. Globe

export default function TranslateButton({ content, setContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("German");
  const [error, setError] = useState(null);

  const languages = {
    English: "en",
    Spanish: "es",
    French: "fr",
    German: "de",
  };

  const handleTranslate = async () => {
    if (!content) return;
    setIsTranslating(true);
    setError(null);

    let success = false;

    while (!success) {
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: content,
            sourceLanguage: languages[sourceLanguage],
            targetLanguage: languages[targetLanguage],
          }),
        });

        const data = await response.json();

        if (data.translation) {
          setContent(data.translation);
          setSourceLanguage(targetLanguage);
          success = true;
        } else {
          console.error("Translation failed: ", data.error);
        }
      } catch (error) {
        console.error("Error during translation:", error);
      }
    }

    setIsTranslating(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Icon Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-2 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200 ease-in-out"
        aria-label="Toggle translation panel"
      >
        <Languages />
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded shadow-lg p-3 z-50">
          {/* Source Language */}
          <div className="mb-3">
            <label htmlFor="sourceLanguage" className="block text-sm font-medium text-gray-700">
              From
            </label>
            <select
              id="sourceLanguage"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              className="w-full mt-1 border border-gray-300 text-black rounded p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              {Object.keys(languages).map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Target Language */}
          <div className="mb-3">
            <label htmlFor="targetLanguage" className="block text-sm font-medium text-gray-700">
              To
            </label>
            <select
              id="targetLanguage"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full mt-1 border border-gray-300 text-black rounded p-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              {Object.keys(languages).map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Translate Button & Error */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className="w-full bg-gray-800 text-white py-1 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              {isTranslating ? "Translating..." : "Translate"}
            </button>

            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
