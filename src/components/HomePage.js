'use client';

import TextBlock from '@/components/TextBlock';
import FilePanel from '@/components/FilePanel';
import { useState, useEffect } from 'react';
import { createUser, createSession } from '@/lib/api';

export let c_sid = -1;

export default function HomePage() {



  
  const [isOpen, setIsOpen] = useState(true);
  const [fileTitle, setFileTitle] = useState("Session 1");
  const [c_uid, setCuid] = useState(null);
  const [c_sid, setCsid] = useState(null);

  useEffect(() => {
    async function intializeUser() {
      const user = await createUser("John Doe", "a@b.c", "12345678");
      


      if (user && user.id){
        setCuid(user.id)
        console.log(user)
      }
   
    }
    intializeUser();
  }, []);
 
  useEffect(() => {
    async function intializeSess() {

        if (c_uid != null){
        const session = await createSession({user_id:c_uid, context:{}});
        
        if (session && session.session_id){
          setCsid(session.session_id)
          console.log(session)
        }
    } }
    
    intializeSess();
  }, [c_uid]);


  function togglePanel(){
    setIsOpen(!isOpen);
  }

  
  return (

    <div className="w-full min-h-screen bg-background flex justify-center p-8">
        {!isOpen && (
          <button onClick={togglePanel} className='flex bg-gray-200 p-5 border-r mr-2 rounded-lg border-gray-300 shadow-md font-sw'>
            <img src="open_close.png" alt="Open" width="20" height="20" className="transform scale-x-[-1]"/>
          </button>
        )}
        {isOpen && <FilePanel fileTitle={fileTitle} onClose={togglePanel} />}
        <TextBlock setFileTitle={setFileTitle} />
    </div>
  );
}
