import { SquarePen } from "lucide-react";
import { useState } from "react";
import Form from 'next/form';
import { renameSession } from "@/lib/api";

export const handleRenameSubmit = (e, fileID, filename, setRenaming, setTriggerAfterRename, setFileBeingRenamed) => {
    filename = filename.length == 0 ? "Unnamed file" : filename;

    e.preventDefault(); // prevents page reload
    setRenaming(false); // renaming state for current file is set to false
    setFileBeingRenamed(null); // no active file being renamed anymore

    try {
        renameSession(fileID, filename);
        setTriggerAfterRename((rename) => !rename);
    } catch (error) {
        console.error("Renaming failed: ", error);
    }
}

export default function RenameFileButton( { className, fileID, setTriggerAfterRename, setFileBeingRenamed }) {
    const [renaming, setRenaming ] = useState(false);
    const [filename, setFilename] = useState("");


    return(
        <div>
            {!renaming &&
            <div className={className}>
                <button
                    className="cursor-pointer cursor-pointer hover:bg-gray-300 text-black font-bold py-1 px-2 rounded-lg flex gap-2 hover:opacity-80 transition-colors duration-200 ease-in-out"
                    onClick={() => {
                            setRenaming(true);
                            setFileBeingRenamed(fileID)}
                        }
                    >

                    <SquarePen size={20} />
                </button>
            </div>
            }
            {renaming &&
                    <Form
                        onSubmit={(e) => handleRenameSubmit(e, fileID, filename, setRenaming, setTriggerAfterRename, setFileBeingRenamed)}>
                        <input
                            type="text"
                            value={filename}
                            onChange={(e) => setFilename(e.target.value)}
                            onBlur={() => {
                                setRenaming(false);
                                setFileBeingRenamed(null);
                                setFilename("");
                            }}
                            autoFocus
                            className="border p-1 rounded w-full"
                            />
                    </Form>
                }
        </div>
    )
}
