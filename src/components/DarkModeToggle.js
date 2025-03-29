import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)
  
  function toggleDarkMode() {
    const htmlEl = document.documentElement;
    setDark((dark) => !dark);
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
      className="hover:bg-gray-300 text-black dark:text-white font-bold py-1 px-2 rounded-lg dark:hover:bg-gray-600 transition-colors duration-200 ease-in-out"
    >
      {!dark && (
        <Moon />
      )}
      {dark && (
        <Sun />
      )}
    </button>
  );
}
