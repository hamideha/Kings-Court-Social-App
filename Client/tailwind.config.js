module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    opacity: ({ after }) => after(['disabled']),
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/forms'),
  ],
}
