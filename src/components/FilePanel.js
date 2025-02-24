"use client";
import AddFileButton from "@/components/AddFileButton";
import { useState, useEffect } from "react";
import { fetchSessions } from "@/lib/api";

export let topMostSession;

export default function FilePanel({ onClose, initialSessionExists }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchSessionNames = async () => {
      try {
        const fetchedSessions = await fetchSessions();
        if (Array.isArray(fetchedSessions)) {
          topMostSession = fetchedSessions[0];
          setFiles(fetchedSessions.map((session) => session.session_name));
        }
      } catch (error) {
        console.error("Error fetching files: ", error);
      }
    };
    fetchSessionNames();
  }, [initialSessionExists]);
  return (
    <div
      id="file_panel"
      className="w-64 h-[95vh] bg-gray-200 dark:bg-gray-800 p-5 border-r mr-2 rounded-lg border-gray-300 dark:border-gray-600 shadow-md font-sw flex flex-col"
    >
      <div className="flex">
        <h2 className="text-xl text-black dark:text-white font-bold mb-4 flex-grow">Files</h2>
        <button onClick={onClose} className="mb-4">
          <img src="open_close.png" alt="Close" width="20" height="20" />
        </button>
      </div>
      <ul className="space-y-2 overflow-y-auto">
        {files.map((filename, index) => (
          <li
            key={index}
            className="text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-2 text-lg rounded-md cursor-pointer"
          >
            {filename}
          </li>
        ))}
      </ul>
      <AddFileButton files={files} setFiles={setFiles} />
    </div>
  );
}
