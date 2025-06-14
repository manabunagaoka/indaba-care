/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#4D4D4D',
        'coral': '#FF6B6B',
        'peach': '#FFBEAB',
        'pink-light': '#FFD6CC',
        'mauve': '#D99B9B',
        'teal-bright': '#40BFBF',
        'yellow-sunshine': '#FFD166',
      },
      keyframes: {
        'slide-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-left': 'slide-left 300ms ease-out',
        'slide-right': 'slide-right 300ms ease-out',
      },
    },
  },
  plugins: [],
}
