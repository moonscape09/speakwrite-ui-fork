export default function StartButton({onClick, isConnected}){
    return (
        <button onClick={onClick} className={`w-24 h-24 ${isConnected? `bg-gray-500 hover:bg-gray-400` : `bg-gray-400 hover:bg-gray-500`}  text-white rounded-full shadow-lg  flex items-center justify-center`}>
            <img src="mic.png" alt="Mic" width="60" height="60"/>
        </button>
    );
}