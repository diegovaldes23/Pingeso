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
            purple: {
                800: '#4a3f6e',
                600: '#6c5b9b',
              },
        }
    },
  },
  plugins: [],
}

