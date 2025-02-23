"use client";

import { useState, useRef, useEffect } from "react";
import StartButton from "./StartButton";
import { sessionsExist } from "./FilePanel";
import { createChat, createUser, createSession, fetchChats } from "@/lib/api";
import MediaParser from "./UploadMedia";
import { setUpRecognition } from "@/lib/SpeechRecognition";
import DownloadPdf from "./DownloadPdf";
import { jsPDF } from "jspdf";
import { flushSync } from "react-dom";

export default function TextBlock({setFileTitle}) {
  const [title, setTitle] = useState(""); // State for the page title
  const [content, setContent] = useState(""); // State for the content
  const contentRef = useRef(null);
  const [c_uid, setCuid] = useState(null);
  const [c_sid, setCsid] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // New state to track WebSocket connection status
  const wsRef = useRef(null);
  // const [transcription, setTranscription] = useState("");
  // const [pdfContent, setPdfContent] = useState("");

  const pdfContentRef = useRef("");
  const transcriptionRef = useRef("");
  // setFileTitle("{}");

  // Fetch the latest chat message for the current session on component mount
  useEffect(() => {
    async function fetchLatestChat() {
      const chats = await fetchChats();
      if (chats && chats.length > 0) {
        console.log(chats)
        const latestChat = chats[0]; // Get the latest chat message
        setContent(latestChat.message);
        if (c_sid == null){
          setCsid(latestChat.session_id);
        }
      }
    }

    fetchLatestChat();
  }, [c_sid]);


  useEffect(() => {
    async function intializeUser() {
      if (c_uid === null){
        const user = await createUser("John Doe", "a@b.c", "12345678");


      if (user && user.id){
        setCuid(user.id)
        console.log(user)
      }

    }}
    intializeUser();
  }, [c_uid]);

  useEffect(() => {
    async function intializeSess() {
        if (c_sid === null){
        if (c_uid != null && sessionsExist){ // check if a session already exists, making it unnecessary to create a new one
        const session = await createSession({session_name: "New file", user_id:c_uid, context:{}});

        if (session && session.session_id){
          setCsid(session.session_id)
          console.log(session)
        }
    } }}

    intializeSess();
  }, [c_uid, c_sid]);


  // Auto-resize the textarea as you type
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = "auto";
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [content]);

  // Handle WebSocket connection
  const handleStartButtonClick = (tone) => {
    const recognition = setUpRecognition(wsRef, c_sid, pdfContentRef, setIsConnected, transcriptionRef);
    if (isConnected) {
      // Close WebSocket connection
      if (wsRef.current) {
        wsRef.current.close();
      }
      recognition.stop(); // Stop speech recognition when disconnecting
      setIsConnected(false);
    } else {
      // Open WebSocket connection
      if (c_sid != null) {
        const ws = new WebSocket("ws://localhost:8000/ws");

      ws.onopen = () => {
        console.log("Connected to WebSocket server.");
        setTimeout(() => setIsConnected(true), 0);
        wsRef.current = ws; // Store WebSocket reference

        // Start speech recognition when the connected
        recognition.start();
      };

      ws.onmessage = async (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === "content") {
            setContent(message.data);
            console.log(message.data, c_sid);
            createChat(c_sid, "speakwrite", message.data);
            pdfContentRef.current = "";
            transcriptionRef.current = "";
            console.log(pdfContentRef.current + " inside onmessage " + transcriptionRef.current);
          } else if (message.type === "title") {
            setTitle(message.data);
            setFileTitle(message.data);
          }

          } catch (err) {
            console.error("Error parsing WebSocket message:", err);
          }
         
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
          console.log("WebSocket connection closed.");
          setTimeout(() => setIsConnected(false), 0);
          recognition.stop(); // Stop speech recognition when connection closes
        };

        wsRef.current = ws; // Store WebSocket reference
      }
    }
  };


  const handleDownloadPdf = () => {
    // Download the content as a PDF file
    const pdf = new jsPDF();
    pdf.text(title, 20, 20);
    pdf.text(content, 20, 30);
    console.log(pdf);
    pdf.save("notes.pdf");
  }

  return (
    <div className="relative w-full bg-white p-10 rounded-lg shadow-md border border-gray-200 font-sw flex flex-col">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New file"
        className="w-full text-4xl font-bold text-gray-900 placeholder-gray-400 mb-4 outline-none bg-transparent flex-none"
      />

      <textarea
        ref={contentRef}
        value={content}
        // onChange={(e) => setContent(e.target.value)}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
        if (e.key === "Enter") {
          setFileTitle(e.target.value.slice(0, 20));
          createChat(c_sid, "speakwrite", e.target.value);
          }
        }}
        placeholder="Start writing your notes here..."
        className="w-full text-xl p-2 outline-none resize-none bg-transparent text-black placeholder-gray-400 leading-relaxed flex-grow basis-0"
        rows={5}
      />
      <div className="flex justify-center basis-0 w-full mt-4">
        <StartButton clickHandler={handleStartButtonClick} isConnected={isConnected}/>
      </div>
      <div className="absolute bottom-0 right-0">
        <MediaParser transcriptionRef = {transcriptionRef} pdfContentRef={pdfContentRef}/>
      </div>

      <div className="absolute bottom-0 left-0 p-2">
        <DownloadPdf handle={handleDownloadPdf}/>
      </div>

    </div>
  );
}
