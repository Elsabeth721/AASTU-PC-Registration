/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background:'#001F3D',
        navbarBackground: '#000F1F',
        buttonBackground:'#49b2e5',
        selectedColor:'#4674a2',
        titleColor:'#CCFFFF',
        paragraphColor:'#8da2c0'
      },
      fontFamily:{
        poppins:["Poppins", "sans-serif"],
        leagueGothic:["League Gothic", "sans-serif"],
      },
      container:{
        center:true,
        padding:{
          DEFAULT:"1rem",
          sm:"1rem",
          lg:"2rem",
          xl:"3rem",
          "2xl":"5rem",
        }
      }
    },
  },
  plugins: [],
}