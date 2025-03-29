import { Trash2 } from "lucide-react";
import { deleteSession } from "@/lib/api";

export const handleDeleteFileButton = async (session_id, setTriggerAfterUpdate, token) => {
    try {
        await deleteSession(session_id, token);
        console.log("deleted");
        setTriggerAfterUpdate((update) => !update);
    } catch (error) {
        console.error("Deletion failed:", error);
    }
}
export default function DeleteFileButton ({ className, fileID, setTriggerAfterUpdate, token }) {

    return (
        <div className={className}>
            <button
                onClick={() => handleDeleteFileButton(fileID, setTriggerAfterUpdate, token)}
                className="dark:text-white cursor-pointer cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 text-black font-bold py-1 px-2 rounded-lg flex gap-2 hover:opacity-80 transition-colors duration-200 ease-in-out"
                >
                <Trash2 size={20}/>
            </button>
        </div>
    );
};
