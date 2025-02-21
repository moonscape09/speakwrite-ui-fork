import { useState } from "react";
import { HfInference } from "@huggingface/inference";
import { useDropzone } from "react-dropzone";
import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;


export default function AudioTranscription({ setTranscription, setPdfContent }) {
  //const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    setLoading(true);
    if (file.type === "audio/mpeg") {
    try {
      // const audioBlob = new Blob([file], { type: "audio/mpeg" });
      // const formData = new FormData();
      // formData.append("file", audioBlob, file.name);
      
      const hf = new HfInference("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");
      //const response = await hf.pipeline("automatic-speech-recognition", "openai/whisper-tiny")(formData);
      const response = await hf.automaticSpeechRecognition({
        data: file,
        model: "openai/whisper-tiny",
        provider: "hf-inference"
      });
      console.log(response);
      setTranscription(response.text);
    } catch (error) {
      console.error("Error transcribing audio:", error);
    } finally{
      setLoading(false);
    }
  }
  else if (file.type === "application/pdf") {
    try{
      console.log('Selected PDF:', file);
      const reader = new FileReader();
      reader.onload = async (event) => {
        try{
        const typedarray = new Uint8Array(event.target.result);
        
        const pdfDoc = await pdfjs.getDocument(typedarray).promise;

        let combinedText = '';
          for (let i = 1; i <= pdfDoc.numPages; i++) {
              const page = await pdfDoc.getPage(i);
              const textContent = await page.getTextContent();
              const textItems = textContent.items.map((item) => item.str);
              combinedText += textItems.join(' ');
          }

        setPdfContent(combinedText);
        console.log('PDF content: ' + combinedText)
      }
      finally{
        setLoading(false);
      }
      };
      reader.readAsArrayBuffer(file);
    }
    catch (error) {
      console.error("Error transcribing pdf:", error);
      setLoading(false);
    }
  }
  else{
    console.error("Invalid file type");
    setLoading(false);

  }
  
  console.log( "Here " + file.type);

};

  const { getRootProps, getInputProps } = useDropzone({ onDrop, 
    accept: {
    "audio/mpeg": [],
    "application/pdf":[]
  }, 
  multiple: false,
});

  return (
    <div className="p-2 max-w-sm mx-auto text-center text-gray-600">
      <div {...getRootProps()} className="border-2 border-dashed p-6 rounded-lg cursor-pointer border-gray-600 hover:border-gray-300">
        <input {...getInputProps()} />
        <p>Drag & drop an MP3 or PDF file here, or click to select one</p>
      </div>
      {loading && <p className="mt-4">Transcribing...</p>}
    </div>
  );
}
