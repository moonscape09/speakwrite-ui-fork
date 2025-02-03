'use client';

export default function FilePanel({onClose, fileTitle}) {
  return (
    <div id="file_panel" className="w-64 bg-gray-200 p-5 border-r mr-2 rounded-lg border-gray-300 shadow-md font-sw">
        <div className="flex">
          <h2 className="text-xl text-black font-bold mb-4 flex-grow">Files</h2>
          <button onClick={ onClose } className="mb-4"> 
            <img src="open_close.png" alt="Close" width="20" height="20"/>
          </button>
        </div>
        <ul className="space-y-2">
            <li className="text-black hover:bg-gray-200 p-2 rounded-md cursor-pointer">{fileTitle}</li>
        </ul>
    </div>
  );
}