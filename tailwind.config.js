/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}", "./public/js/script.js", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: '#008598',
        secondary: {
          100: '#00424c',
          500: '#329DAC', // Added secondary color based on gradient
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-linear': 'linear-gradient(135deg, rgba(0,133,152,1) 0%, rgba(50,157,172,1) 100%)',
      },
      transitionProperty: {
        'height': 'height'
      },
      transitionDuration: {
        '300': '300ms'
      },
      transitionTimingFunction: {
        'ease': 'ease'
      }
    },
  },
  plugins: [],
}
