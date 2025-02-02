"use client";

import { useState, useRef, useEffect } from "react";
import StartButton from "./StartButton";

export default function TextBlock() {
  const [title, setTitle] = useState(""); // State for the page title
  const [content, setContent] = useState(""); // State for the content
  const contentRef = useRef(null);

  // Set up WebSocket connection and handle messages
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "content") {
        setContent(message.data);
      } else if (message.type === "title") {
        setTitle(message.data);
      }
      console.log("Message received from server: " + message);
    };

    ws.onopen = () => {
      console.log("Connected to WebSocket server.");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      ws.close();
    };
  }, []);

  // Auto-resize the textarea as you type
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="w-full bg-white p-10 rounded-lg shadow-md border border-gray-200 font-sw flex flex-col">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New page"
        className="w-full text-4xl font-bold text-gray-900 placeholder-gray-400 mb-4 outline-none bg-transparent flex-none"
      />

      <textarea
        ref={contentRef}
        value={content}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start writing your notes here..."
        className="w-full text-xl p-2 outline-none resize-none bg-transparent text-black placeholder-gray-400 leading-relaxed flex-grow basis-0"
        rows={5}
      />
      <div className="flex justify-center basis-0">
        <StartButton />
      </div>
    </div>
  );
}
