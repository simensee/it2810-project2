/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'elem-bg': '#efd0ca',
        'nav-bg': '#64748b'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
