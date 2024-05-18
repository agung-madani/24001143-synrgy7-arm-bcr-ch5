/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    screens: {
      mobile: "460px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        'darkblue': {
          '05': '#091b6f',
          '04': '#0d28a6',
          '03': '#5e70c4',
          '02': '#aeb7e1',
          '01': '#cfd4ed',
        },
        'limegreen': {
          '05': '#3d7b3f',
          '04': '#5cb85f',
          '03': '#92d094',
          '02': '#c9e7ca',
          '01': '#def1df',
        },
        'alrt': {
          'red': '#fa2c5a',
          'yellow': '#f9cc00',
          'green': '#73ca5c',
        },
        'neutral': {
          '05': '#151515',
          '04': '#3c3c3c',
          '03': '#8a8a8a',
          '02': '#d0d0d0',
          '01': '#ffffff',
        },
      },
      fontFamily: {
        'sans': ['Helvetica'],
      },
      spacing: {
        '80': '80px',
        '100': '100px'
      }
    },
  },
  plugins: [],
}