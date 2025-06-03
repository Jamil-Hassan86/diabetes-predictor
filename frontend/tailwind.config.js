/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#2563eb',
        'secondary': '#94a3b8',
        'accent': '#bae6fd',
        'neutral': '#f1f5f9',
      },
    },
  },
  plugins: [],
}
