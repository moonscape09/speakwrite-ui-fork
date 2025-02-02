export default function StartButton(){
    return (
        <button onClick={onClick} className="w-24 h-24 bg-gray-400 text-white rounded-full shadow-lg hover:bg-gray-500 flex items-center justify-center">
            <img src="mic.png" alt="Mic" width="60" height="60"/>
        </button>
    );
}

function onClick(){
    // Some kind of request
    // Update writing area with response 
}