import { createChat } from "./api";


export const setUpRecognition = (wsRef, c_sid, pdfRef, setIsConnected, transcriptionRef, token, tone) => {
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
        console.log(token)
        createChat(c_sid, "user", transcript, token);
        console.log("Transcribed speech:", transcript);
  
        // Send the transcribed speech to WebSocket server
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          // console.log(pdfContent)
          // console.log(transcription)
            wsRef.current.send(JSON.stringify({ content: transcript + " " + pdfRef.current + " " + transcriptionRef.current, tone: tone }));
        }
      }
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsConnected(false);
    };
  
    recognition.onend = () => {
      console.log("Speech recognition ended.");
      setIsConnected(false);
    };
  }
  return recognition;
}

