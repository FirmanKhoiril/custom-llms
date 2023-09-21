/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "Heltevica", "sans-serif"],
      },
      backgroundColor: {
        dark: "#202124",
        light: "#fff",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
