/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#171717",
        background: "#F1F1EF",
        // foreground: "var(--foreground)",
      },
      fontFamily: {
        sw: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
