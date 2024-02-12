/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,css,ts,js,svelte}"],
  theme: {
    extend: {
      colors: {
        background: '#111',
        secondary: '#181818',
        foreground: '#ddd',
        border: '#ffffff1a',
        primary: '#ff5d38'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}

