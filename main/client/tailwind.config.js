/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        themColor: {
          blue:"#0f1c39",
          green:"#338e8a",
          ligthblue:"#dcf2f1",
          white:"#f1f1e6"
        }
      },
      fontFamily:{
        suse: ['"SUSE"','sans-serif'],
        Poppins: ['"Poppins"','sans-serif'],
        outline: ['"Bungee Outline"', "serif"],
      },
      aspectRatio: {
        '16/9': '16 / 9',
      },
    },
  },
  plugins: [],
};
