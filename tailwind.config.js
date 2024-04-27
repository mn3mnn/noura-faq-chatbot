/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}", "./public/js/script.js", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        whitee: {
          100: '#f5f5f5',
          200: '#daf4f0',
        }
      },
    },
  },
  plugins: [],
}
