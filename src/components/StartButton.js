import { useState } from "react";
import { Mic, AlignCenter, Briefcase, Cpu, Smile } from "lucide-react";

export default function StartButton({ clickHandler, isConnected }) {
  const [tone, setTone] = useState("Concise");

  const toneOptions = [
    {
      name: "Concise",
      icon: AlignCenter,
      color: "bg-blue-200",
      tooltip: "Optimized for clarity and brevity",
    },
    {
      name: "Professional",
      icon: Briefcase,
      color: "bg-green-200",
      tooltip: "Polished, respectful, and formal tone",
    },
    {
      name: "Technical",
      icon: Cpu,
      color: "bg-purple-200",
      tooltip: "Precise and analytical, using domain terms",
    },
    {
      name: "Friendly",
      icon: Smile,
      color: "bg-pink-200",
      tooltip: "Warm, casual, and approachable style",
    },
  ];

  const handleClick = () => {
    clickHandler(tone);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Active tone indicator */}
      <p className="text-sm text-gray-600 dark:text-gray-200">
        Selected Tone: <strong>{tone}</strong>
      </p>

      {/* Central Mic Button */}
      <button
        onClick={handleClick}
        className={`p-5 rounded-full shadow-lg text-white dark:text-black transition-colors duration-200 ${
          isConnected ? "bg-gray-400 hover:bg-gray-500" : "bg-black dark:bg-white hover:bg-gray-600"
        }`}
      >
        <Mic size={36} />
      </button>

      {/* Tone Segmented Control */}
      <div className="flex flex-wrap justify-center gap-2 mt-2" role="group" aria-label="Tone selector">
        {toneOptions.map(({ name, icon: Icon, color, tooltip }) => (
          <button
            key={name}
            onClick={() => setTone(name)}
            title={tooltip}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-full shadow transition-all 
              ${
                tone === name
                  ? `${color} text-black ring-2 ring-offset-2 ring-blue-500`
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}