const { indigo } = require('tailwindcss/colors')

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
    extend: {
      colors: {
        black: '#121212',
        indigo,
      },
      lineHeight: {
        tight: 1.2,
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}