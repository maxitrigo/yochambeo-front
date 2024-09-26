export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      sm: '480px',  // Pequeñas
      md: '640px',  // Medianas
      lg: '768px',  // Grandes
      xl: '1024px', // Extra grandes
      '2xl': '1280px', // Muy grandes
    },
    extend: {},
  },
  plugins: [],
};

