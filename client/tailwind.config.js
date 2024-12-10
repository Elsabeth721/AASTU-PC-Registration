module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}', // Include paths for all source files where Tailwind classes might be used
  ],
  theme: {
    extend: {
      screens: {
        'custom': '1000px', // Add custom screen size for 900px
      },
      colors: {
        // You can add your custom colors here if needed
        'primary': '#001F3D',
        'secondary': '#1c4a72',
        'highlight': '#00294D',
        'text-light': '#CCFFFF',
      },
    },
  },
  plugins: [],
};
