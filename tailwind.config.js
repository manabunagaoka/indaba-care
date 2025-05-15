/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff5f2',
          100: '#ffe6df',
          200: '#ffd0c1',
          300: '#ffb197',
          400: '#ff8460',
          500: '#ff6132',
          600: '#f04d1b',
          700: '#cc3d12',
          800: '#a13213',
          900: '#832e15',
        },
        mint: {
          50: '#effef7',
          100: '#dafeef',
          200: '#b6f5dc',
          300: '#83e5c3',
          400: '#47cba2',
          500: '#2ab089',
          600: '#1a8d6f',
          700: '#16715a',
          800: '#165b49',
          900: '#144a3d',
        },
      },
    },
  },
  plugins: [],
}