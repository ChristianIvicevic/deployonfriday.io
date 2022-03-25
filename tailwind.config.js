module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
