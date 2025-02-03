'use client';

import TextBlock from '@/components/TextBlock';
import FilePanel from '@/components/FilePanel';
import { useState } from 'react';


export default function HomePage() {
  const [isOpen, setIsOpen] = useState(true);

  function togglePanel(){
    setIsOpen(!isOpen);
  }

  return (
    <div className="w-full min-h-screen bg-background flex justify-center p-8">
        {!isOpen && (
          <button onClick={togglePanel} className='flex bg-gray-200 p-5 border-r mr-2 rounded-lg border-gray-300 shadow-md font-sw min-h-0'>
            <img src="open_close.png" alt="Open" width="20" height="20" className="transform scale-x-[-1]"/>
          </button>
        )}
        {isOpen && <FilePanel onClose={togglePanel} />}
        <TextBlock />
    </div>
  );
}
