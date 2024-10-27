/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // blue: {
        //   dark: "#102a43",
        //   lightDark: "#486581",
        //   light: "#829ab1",
        //   white: "#f0f4f8",
        // },
        blue: '#3e688c',
        green: '#5ba66e'
      },
      fontFamily: {
        normal: ['"Signika"', "serif"],
        simple: ['"Merienda"', "serif"],
        outline: ['"Bungee Outline"', "serif"],
      },
    },
  },
  plugins: [],
};
