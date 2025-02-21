import { useState } from "react";
import { HfInference } from "@huggingface/inference";
import { useDropzone } from "react-dropzone";


export default function AudioTranscription({ setTranscription }) {
  //const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    setLoading(true);
    try {
      const audioBlob = new Blob([file], { type: "audio/mpeg" });
      const formData = new FormData();
      formData.append("file", audioBlob, file.name);
      
      const hf = new HfInference("xxxxx");
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
    }
    setLoading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "audio/mpeg" });

  return (
    <div className="p-4 max-w-lg mx-auto text-center">
      <div {...getRootProps()} className="border-2 border-dashed p-6 rounded-lg cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag & drop an MP3 file here, or click to select one</p>
      </div>
      {loading && <p className="mt-4">Transcribing...</p>}
    </div>
  );
}
