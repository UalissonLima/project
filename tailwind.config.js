/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        bgContainer: "#A3839F",
        bgMain: "#F5E0F3",
        bgButtons: "#D2CAD2"
      },
    },
  },
  plugins: [],
};
