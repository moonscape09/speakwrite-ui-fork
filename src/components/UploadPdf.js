"use client"

import { useRef } from "react";
import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

export default function UploadPdf({setPdfContent}) {
    // return(
    //     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handle}>
    //         UploadPdf
    //     </button>
    // )
    const fileInputRef = useRef(null);

  // Trigger the hidden file input when the button is clicked
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle the PDF file once selected
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Here you can do whatever you need with the file, e.g.:
      //  - Store it in state
      //  - Send to an API
      //  - Parse text with pdfjs-dist, etc.
      console.log('Selected PDF:', file);
        const reader = new FileReader();
        reader.onload = async (event) => {
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
        };
        reader.readAsArrayBuffer(file);
      

    }
  };

  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleButtonClick}>Upload PDF</button>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        onSubmitCapture={handleFileChange}
        style={{ display: 'none' }} // Hide the file input
      />
    </div>
  );
}
