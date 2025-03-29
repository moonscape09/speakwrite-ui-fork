/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        text: "#171717",
        background: "#F1F1EF",
        swdark: "#28234F",
        swlight: "#FBF5E7"
      },
      fontFamily: {
        sw: ['Inter', 'Arial', 'Helvetica', 'sans-serif']
      }
    }
  },
  plugins: []
};