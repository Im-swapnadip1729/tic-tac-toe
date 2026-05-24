/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", //  Tailwind to look for the "dark" class on the HTML tag
  theme: {
    extend: {},
  },
  plugins: [],
};
