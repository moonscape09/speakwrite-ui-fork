"use client";

import TextBlock from "@/components/TextBlock";
import FilePanel from "@/components/FilePanel";
import { useState } from "react";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(true);
  const [fileTitle, setFileTitle] = useState("Session 1");
  const [currentFileID, setCurrentFileID] = useState(); // State for the current file, contains the ID

  // used for triggering a fetch of all sessions to update session list when a session has been created or updated
    const [triggerAfterUpdate, setTriggerAfterUpdate] = useState(false);

  function togglePanel() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="w-full min-h-screen bg-background dark:bg-gray-900 text-black dark:text-white flex justify-center p-8">
      {!isOpen && (
        <button
          onClick={togglePanel}
          className="flex bg-gray-200 dark:bg-gray-800 p-5 border-r mr-2 rounded-lg border-gray-300 dark:border-gray-600 shadow-md font-sw"
        >
          <img
            src="open_close.png"
            alt="Open"
            width="20"
            height="20"
            className="transform scale-x-[-1] object-contain"
          />
        </button>
      )}
      {isOpen && <FilePanel fileTitle={fileTitle} onClose={togglePanel} setCurrentFileID={setCurrentFileID} currentFileID={currentFileID} triggerAfterUpdate={triggerAfterUpdate} setTriggerAfterUpdate={setTriggerAfterUpdate}/>}
      <TextBlock setFileTitle={setFileTitle} currentFileID={currentFileID} triggerAfterUpdate={triggerAfterUpdate} setTriggerAfterUpdate={setTriggerAfterUpdate} />
    </div>
  );
}
