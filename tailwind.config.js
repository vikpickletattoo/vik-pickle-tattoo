/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a1410',          // rgb(26 20 16)
        cream: {
          DEFAULT: '#f7f3ec',    // rgb(247 243 236)
          dark: '#ede7da',       // rgb(237 231 218)
        },
        gold: {
          DEFAULT: '#c9a84c',    // rgb(201 168 76)
          light: '#e8c97a',      // rgb(232 201 122)
          dark: '#8b6914',       // rgb(139 105 20)
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [], // no @tailwindcss/typography: `prose` in the bundle generated no CSS
}
