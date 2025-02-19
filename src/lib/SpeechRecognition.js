import { createChat } from "./api";

export const setUpRecognition = (wsRef, c_sid) => {
  let recognition; 

  if (typeof window !== 'undefined') { // added this check as I would get window not defined error (probably has to do with SSR)
    // Create a SpeechRecognition instance (using vendor prefixes for broader compatibility)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
  
    // Configure speech recognition
    recognition.continuous = true;        // Keep recognition running continuously
    recognition.interimResults = false;   // Send only final results if false, otherwise sends partial transcripts
    recognition.lang = 'en-US';           // Set the language (adjust as needed)
  
    // Speech recognition handler
    recognition.onresult = (event) => {
  
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
      if (transcript) {
        createChat(c_sid, "user", transcript);
        console.log("Transcribed speech:", transcript);
  
        // Send the transcribed speech to WebSocket server
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(transcript);
        }
      }
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  
    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };
  }
  return recognition;
}

