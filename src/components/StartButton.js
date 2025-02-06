import { useState } from "react";

export default function StartButton({clickHandler, isConnected}){
    const [tone, setTone] = useState("Concise");

    return (
        <div className="relative flex items-center justify-center">
            <button
                onClick={() => clickHandler(tone)}
                className={`w-24 h-24 ${isConnected? `bg-gray-500 hover:bg-gray-400` : `bg-gray-400 hover:bg-gray-500`} mb-2 text-white rounded-full shadow-lg  flex items-center justify-center`}
                >
                    <img src="mic.png" alt="Mic" width="60" height="60"/>
            </button>
            <div className="absolute top-full flex space-x-3">
                <button
                    onClick={() => setTone("Concise")}
                    className={`text-black p-1 bg-gray-200 hover:bg-gray-400 rounded ${tone === "Concise" ? "bg-gray-400 text-white" : ""}`}
                    >
                        Concise
                </button>
                <button
                    onClick={() => setTone("Professional")}
                    className={`text-black p-1 bg-gray-200 hover:bg-gray-400 rounded ${tone === "Professional" ? "bg-gray-400 text-white" : ""}`}
                    >
                        Professional
                </button>
                <button
                    onClick={() => setTone("Technical")}
                    className={`text-black p-1 bg-gray-200 hover:bg-gray-400 rounded ${tone === "Technical" ? "bg-gray-400 text-white" : ""}`}
                    >
                        Technical
                </button>
                <button
                    onClick={() => setTone("Friendly")}
                    className={`text-black p-1 bg-gray-200 hover:bg-gray-400 rounded ${tone === "Friendly" ? "bg-gray-400 text-white" : ""}`}
                    >
                        Friendly
                </button>
            </div>
        </div>
    );
}
