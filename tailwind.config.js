/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Space Grotesk'],
    },
    extend: {
      screens: {
        '950': '950px',
        '603': '603px',
        '1279': '1279px',
        '767': '767px',
      },
    },
  },
  plugins: [],
}

