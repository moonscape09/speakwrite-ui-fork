import { FilePlus } from 'lucide-react';
import { createSession } from '@/lib/api';

const handleAddFileButton = async (setFiles) => {
    try {
        const newSession = await createSession({session_name: "New file", user_id: 1, context:{}}) // TODO: will have to manage the actual user id state, this will likely be addressed after auth
        setFiles((prevFiles) => [...prevFiles, newSession.session_name]) // added the setter here to force React to re-render and display the newly created file
    } catch (error) {
        console.log("Error in creating new session", error);
    }
}
export default function AddFileButton( { setFiles } ) {
    return (
        <button
            onClick={() => handleAddFileButton(setFiles)}
            className="mt-2 w-fit bg-transparent cursor-pointer hover:bg-gray-300 text-black font-bold py-1 px-2 rounded-lg flex gap-2 hover:opacity-80 transition-colors duration-200 ease-in-out"
            >
            <FilePlus size={22}/>
        </button>
    );
}
