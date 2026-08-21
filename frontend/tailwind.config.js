/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgsite: "#0f1015",
        authPainel: "#1a1a2e",
        destaque: "#785a28",
        uppernav: "#02131a"
      },
      fontFamily: {
      raleway: ["Raleway", "sans-serif"]
    }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
