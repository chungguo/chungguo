const { teal } = require('tailwindcss/colors')

module.exports = {
  corePlugins: {
    appearance: false,
    resize: false,
  },
  purge: [
    './components/**/*.tsx',
    './pages/**/*.tsx',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'custom': [ 
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ]
    },
    extend: {
      colors: {
        black: '#121212',
        teal,
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}