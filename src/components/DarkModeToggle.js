import { useEffect } from "react";

export default function DarkModeToggle() {
  function toggleDarkMode() {
    const htmlEl = document.documentElement;
    // Toggle the "dark" class
    if (htmlEl.classList.contains("dark")) {
      htmlEl.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      htmlEl.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <button
      onClick={toggleDarkMode}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-gray-600 text-black dark:text-white"
    >
      Toggle Dark Mode
    </button>
  );
}
