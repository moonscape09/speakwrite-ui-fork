"use client";

export default function DownloadPdf({ handle }) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-gray-600 dark:hover:bg-gray-800 dark:text-white"
      onClick={handle}
    >
      DownloadPdf
    </button>
  );
}
