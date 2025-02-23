'use client';

import TextBlock from '@/components/TextBlock';
import FilePanel from '@/components/FilePanel';
import { useState } from 'react';

export default function HomePage() {
  
  const [isOpen, setIsOpen] = useState(true);
  const [fileTitle, setFileTitle] = useState("Session 1");


  function togglePanel(){
    setIsOpen(!isOpen);
  }

  
  return (

    <div className="w-full min-h-screen bg-background flex justify-center p-8">
        {!isOpen && (
          <button onClick={togglePanel} className='flex bg-gray-200 p-5 border-r mr-2 rounded-lg border-gray-300 shadow-md font-sw'>
            <img src="open_close.png" alt="Open" width="20" height="20" className="transform scale-x-[-1] object-contain"/>
          </button>
        )}
        {isOpen && <FilePanel fileTitle={fileTitle} onClose={togglePanel} />}
        <TextBlock setFileTitle={setFileTitle}/>
    </div>
  );
}
