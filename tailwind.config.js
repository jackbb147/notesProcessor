/** @type {import('tailwindcss').Config} */

const { mauve, violet, red, blackA } = require('@radix-ui/colors');

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "grey": "#D4DAD8",
        "selectedItem-2": "#9BA8A2",
        dark_secondary: "#393E46",
        dark_primary: "#222831",
        dark_selectedItem_2: "#FFD369",
        dark_overlay: "black",
        ...mauve,
        ...violet,
        ...red,
        ...blackA,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

