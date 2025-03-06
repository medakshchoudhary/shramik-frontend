/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './App.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'merriweather-regular': 'Merriweather-Regular',
        'merriweather-medium': 'Merriweather-Medium',
        'merriweather-bold': 'Merriweather-Bold',
      },
    },
  },
  plugins: [],
};
