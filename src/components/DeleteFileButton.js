import { Trash2 } from "lucide-react";
import { deleteSession } from "@/lib/api";

export const handleDeleteFileButton = async (session_id, setTriggerAfterUpdate) => {
    try {
        await deleteSession(session_id);
        console.log("deleted");
        setTriggerAfterUpdate((update) => !update);
    } catch (error) {
        console.error("Deletion failed:", error);
    }
}
export default function DeleteFileButton ({ className, fileID, setTriggerAfterUpdate }) {

    return (
        <div className={className}>
            <button
                onClick={() => handleDeleteFileButton(fileID, setTriggerAfterUpdate)}
                className="dark:text-white cursor-pointer cursor-pointer hover:bg-gray-300 text-black font-bold py-1 px-2 rounded-lg flex gap-2 hover:opacity-80 transition-colors duration-200 ease-in-out"
                >
                <Trash2 size={20}/>
            </button>
        </div>
    );
};
