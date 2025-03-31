import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { HfInference } from "@huggingface/inference";
import * as pdfjs from "pdfjs-dist";
import { Upload } from "lucide-react"; // or "FilePlus", whichever you prefer

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

export default function MediaParser({ transcriptionRef, pdfContentRef, setMediaCounter }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);

    try {
      if (file.type === "audio/mpeg") {
        // Transcribe MP3 using Hugging Face
        const hf = new HfInference(process.env.NEXT_PUBLIC_HF_TOKEN);
        let success = false;
        let transcription = "";

        while (!success) {
          try {
            const response = await hf.automaticSpeechRecognition({
              data: file,
              model: "openai/whisper-tiny",
              provider: "hf-inference",
            });
            transcription = response.text;
            success = true;
          } catch (error) {
            console.warn(`Retrying... (${retries + 1}/${MAX_RETRIES})`);
            await new Promise((res) => setTimeout(res, 1000 * (2 ** retries))); // Exponential backoff
          }
        }

        if (!success) {
          console.error("Failed to transcribe after multiple attempts");
        }
        if (transcriptionRef.current && transcription === "") {
          setMediaCounter((prev) => prev + 1); // Increment media counter
        }
        transcriptionRef.current = transcription;
      } else if (file.type === "application/pdf") {
        // Extract PDF text using pdf.js
        const reader = new FileReader();
        reader.onload = async (event) => {
          const typedarray = new Uint8Array(event.target.result);
          const pdfDoc = await pdfjs.getDocument(typedarray).promise;

          let combinedText = "";
          for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const textContent = await page.getTextContent();
            const textItems = textContent.items.map((item) => item.str);
            combinedText += textItems.join(" ");
          }
          if (pdfContentRef.current == "") {
            setMediaCounter((prev) => prev + 1); // Increment media counter
          }
          pdfContentRef.current = combinedText;
        };
        reader.readAsArrayBuffer(file);
      } else {
        console.error("Invalid file type. Please upload an MP3 or PDF.");
      }
    } catch (error) {
      console.error("Error processing file:", error);
    } finally {
      setLoading(false);
    }
  };

  // Configure react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [],
      "application/pdf": [],
    },
    multiple: false,
  });

  return (
    <div>
      {/* Minimal Upload Icon Button */}
      <button
        onClick={() => setShowModal(true)}
        className="py-1 px-2 rounded-lg mb-1 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                   focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200 ease-in-out"
        title="Upload"
      >
        <Upload />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay - click to close */}
          <div
            className="absolute inset-0 bg-black bg-opacity-30"
            onClick={() => setShowModal(false)}
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-sm mx-auto bg-white rounded shadow-lg p-6 text-gray-700">
            <h2 className="text-lg font-semibold mb-4">Upload a File</h2>

            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer
                         hover:border-gray-400 transition"
            >
              <input {...getInputProps()} />
              <p className="text-sm text-center text-gray-500">
                Drag &amp; drop an MP3 or PDF here,
                <br />
                or <span className="underline">click</span> to browse
              </p>
            </div>

            {loading && (
              <p className="mt-4 text-sm text-gray-500">
                Processing your file...
              </p>
            )}

            {/* Close Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-2 text-sm rounded bg-gray-800 hover:bg-gray-700 text-white
                           focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
