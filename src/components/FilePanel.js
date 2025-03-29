"use client";
import { useState, useEffect } from "react";
import AddFileButton from "@/components/AddFileButton";
import DeleteFileButton from "@/components/DeleteFileButton";
import RenameFileButton from "@/components/RenameFileButton";
import LogOutButton from "@/components/LogOutButton";
import { fetchSessions } from "@/lib/api";
import Image from 'next/image'
import DarkModeToggle from "@/components/DarkModeToggle"

export default function FilePanel({
  setCurrentFileID,
  currentFileID,
  triggerAfterUpdate,
  setTriggerAfterUpdate,
  token,
  handleLogout,
  isLoggedIn
}) {
  const [files, setFiles] = useState([]);
  const [fileBeingRenamed, setFileBeingRenamed] = useState(null);

  useEffect(() => {
    const fetchSessionNames = async () => {
      try {
        const fetchedSessions = await fetchSessions(token);
        if (Array.isArray(fetchedSessions)) {
          const topMostSession = fetchedSessions[0];
          if (topMostSession) {
            setCurrentFileID(topMostSession.session_id);
          } else {
            setCurrentFileID(-1);
          }
          setFiles(
            fetchedSessions.map((session) => ({
              session_name: session.session_name,
              session_id: session.session_id,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching files: ", error);
      }
    };
    if (token) fetchSessionNames();
  }, [triggerAfterUpdate, token]);

  return (
    <div
      id="file_panel"
      className="flex flex-col font-sw w-64 h-screen bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-800"
    >
      {/* Header section */}
      <div className="flex items-center px-4 py-3 pl-16">
          <Image 
            src="/sw-logo.png"
            width={80}
            height={80}
            alt="Picture of the author"
          />
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
          Files
        </h2>
        <AddFileButton
          files={files}
          setFiles={setFiles}
          setTriggerAfterUpdate={setTriggerAfterUpdate}
          token={token}
        />
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <ul className="space-y-1">
          {files.map((file) => (
            <li
              key={file.session_id}
              className={`
                group flex items-center justify-between rounded-md px-3 py-2 text-md
                cursor-pointer text-gray-700 dark:text-gray-200
                hover:bg-gray-200 dark:hover:bg-gray-700
                ${
                  file.session_id === currentFileID
                    ? "bg-gray-300 dark:bg-gray-600"
                    : ""
                }
              `}
              onClick={() => setCurrentFileID(file.session_id)}
            >
              <span>
                {file.session_id !== fileBeingRenamed && file.session_name}
              </span>

              <div className="inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <RenameFileButton
                  fileID={file.session_id}
                  setTriggerAfterUpdate={setTriggerAfterUpdate}
                  setFileBeingRenamed={setFileBeingRenamed}
                  token={token}
                />
                <DeleteFileButton
                  fileID={file.session_id}
                  setTriggerAfterUpdate={setTriggerAfterUpdate}
                  setFileBeingRenamed={setFileBeingRenamed}
                  token={token}
                />
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t flex justify-between border-gray-300 dark:border-gray-400 px-4 py-3">
        <DarkModeToggle />
        {isLoggedIn && (<LogOutButton handleLogout={handleLogout}/>)}
      </div>
    </div>
  );
}
