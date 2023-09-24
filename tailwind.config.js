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
        primary: "#7c3aed",
        hoverPrimary: "#6d28d9",
        secondary: "#3b82f6",
        hoverSecondary: "#2563eb",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
