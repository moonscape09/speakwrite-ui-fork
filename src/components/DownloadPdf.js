"use client";
import { ArrowDownToLine } from "lucide-react"
export default function DownloadPdf({ handle }) {
  return (
    <button
      className="inline-flex gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 mb-1 text-black dark:text-white font-bold py-1 px-2 rounded-lg dark:hover:bg-gray-400 transition-colors duration-200 ease-in-out"
      onClick={handle}
    >
      <ArrowDownToLine />
      PDF
    </button>
  );
}
