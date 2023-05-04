const { teal } = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.tsx',
    './components/**/*.tsx',
  ],
  theme: {
    fontFamily: {
      custom: [
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
      },
    },
  }
}
