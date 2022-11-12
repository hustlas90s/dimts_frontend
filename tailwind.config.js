const { url } = require('inspector');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      'mont' : 'Montserrat, Arial'
    },
    extend: {
      backgroundImage : {
        'login' : "url('/images/login_img.jpg')",
        'register' : "url('/images/register_img.jpg')",
      },
      gridTemplateColumns : {
        'layout' : '250px 1fr'
      },
      gridTemplateRows : {
        'layout' : '88px 1fr'
      }
    },
  },
  plugins: [],
}
