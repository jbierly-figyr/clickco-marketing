module.exports = {
  purge: {
    mode: 'all',
    content: ['./**/*.html'],
    options: {
      whitelist: [],
    },
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'clickco-blue': {
          50: '#E2E9F3',
          100: '#C2D0E5',
          200: '#86A1CB',
          300: '#4B73AF',
          400: '#324D76',
          500: '#182538',
          600: '#141E2E',
          700: '#0E1520',
          800: '#090E15',
          900: '#05070B',
        },
        'clickco-turquoise': {
          50: '#F1F8F9',
          100: '#DFF0F2',
          200: '#BEE0E4',
          300: '#9ED1D7',
          400: '#81C3CB',
          500: '#5FB3BD',
          600: '#4399A2',
          700: '#317077',
          800: '#214B4F',
          900: '#102528',
        },
        'clickco-gray': {
          50: '#ECEEEE',
          100: '#DADDDD',
          200: '#B4BBBB',
          300: '#8F9999',
          400: '#6B7575',
          500: '#495050',
          600: '#3A4040',
          700: '#2C3030',
          800: '#1D2020',
          900: '#0F1010',
        },
      },
      fontFamily: {
        'kumbh-sans': ['Kumbh-Sans', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '30px',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
