'use client';

import { useState, useRef, useEffect } from 'react';

export default function TextBlock() {
  const [title, setTitle] = useState(''); // State for the page title
  const [content, setContent] = useState(''); // State for the content
  const contentRef = useRef(null);

  // Auto-resize the textarea as you type
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="w-full bg-white p-10 rounded-lg shadow-md border border-gray-200 font-sw">
      <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New page"
          className="w-full text-4xl font-bold text-gray-900 placeholder-gray-400 mb-4 outline-none bg-transparent"
        />

      <textarea
        ref={contentRef}
        value={content}
        onChange={(e) => setText(e.target.value)}
        placeholder = "Start writing your notes here..."
        className="w-full text-xl p-2 outline-none resize-none bg-transparent text-black placeholder-gray-400 leading-relaxed"
        rows={5}
      />
    </div>
  );
}
