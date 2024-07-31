/** @type {import('tailwindcss').Config} */

import { screens } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bodyPattern: "url('/src/assets/img/background.png')",
      },
      colors: {
        gray: {
          100: "#F2F2F2",
          200: "#A6A8AB",
        },
        blue: {
          100: "#2B344B",
          200: "#3E4A68",
          300: "#638EC4",
        },
        red: {
          100: "#E96FA4",
          200: "#AF638C",
        },
        green: {
          100: "#65BD65",
          200: "#508853",
        },
        black: {
          0: "#000000",
          100: "#4D4D4D",
        },
      },
      boxShadow: {
        circle: "0px 4px 20px 0px #2F3C5526",
      },
      screens: {
        ...screens,
        phone: "400px",
        sm: "600px",
        sl: "600px",
      },
    },
  },
  plugins: [],
};
