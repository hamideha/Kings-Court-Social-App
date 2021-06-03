module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
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
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
