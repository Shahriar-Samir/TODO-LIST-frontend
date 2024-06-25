/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
'./node_modules/react-tailwindcss-datetimepicker/dist/react-tailwindcss-datetimepicker.js',
  ],
  darkMode: false,
  theme: {
    extend: {
      
    },

  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light']
  }
}