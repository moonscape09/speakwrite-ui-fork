'use client';
import AddFileButton from "@/components/AddFileButton";
import RenameFileButton from "@/components/RenameFileButton";
import { useState, useEffect } from "react";
import { fetchSessions } from "@/lib/api";

export let sessionsExist;

export default function FilePanel({ onClose }) {
  const [files, setFiles] = useState([]);

  // checks for the file actively being renamed, on which we display as a text area rather than the file name on the panel
  const [fileBeingRenamed, setFileBeingRenamed] = useState();

  // used for triggering a fetch of all sessions to update session list when a session has been renamed
  const [triggerAfterRename, setTriggerAfterRename] = useState(false);

  useEffect(() => {
    const fetchSessionNames = async () => {
      try {
        const fetchedSessions = await fetchSessions();
        sessionsExist = fetchedSessions.size > 0;
        if (Array.isArray(fetchedSessions)) {
          setFiles(fetchedSessions.map(session => ({"session_name": session.session_name, "session_id": session.session_id})).reverse()); // TODO: reversing order of sessions on client-side for now, but let's discuss doing this on the DB service
        }
      } catch (error) {
        console.error("Error fetching files: ", error);
      }
    }
    fetchSessionNames();
  }, [triggerAfterRename]) // only on mount or after renaming

  return (
    <div id="file_panel" className="w-64 h-[95vh] bg-gray-200 pl-3 pt-3 pr-2 pb-3 border-r mr-2 rounded-lg border-gray-300 shadow-md font-sw flex flex-col">
      <div className="flex">
        <h2 className="text-xl text-black font-bold mb-4 flex-grow">Files</h2>
        <button onClick={onClose} className="mb-4">
          <img src="open_close.png" alt="Close" width="20" height="20" />
        </button>
      </div>
      <ul className="space-y-2 overflow-y-auto">
        {files.map((file, index) => (
          <li
            key={index}
            className="group text-black hover:bg-gray-200 p-2 text-lg rounded-md cursor-pointer flex justify-between items-center"
          >
            {file.session_id != fileBeingRenamed && file.session_name}
            <RenameFileButton className="hidden group-hover:flex" fileID={file.session_id} setTriggerAfterRename={setTriggerAfterRename} setFileBeingRenamed={setFileBeingRenamed} />
          </li>
        ))}
      </ul>
      <AddFileButton files={ files } setFiles={ setFiles }/>
    </div>
  );
}