/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#008598',
        secondary: {
          100: '#00424c',
        }
      }
    },
  },
  plugins: [],
}
