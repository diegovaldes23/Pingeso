/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            "pink-pastel": "#F7A1C4",
            "cyan-pastel": "#78D5D7",
            "yellow-pastel": "#FFE787",
        }
    },
  },
  plugins: [],
}

