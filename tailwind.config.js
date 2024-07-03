/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif']
    },
    fontSize: {
      xs: ['0.75rem', '1.15'],
      sm: ['0.875rem', '1.375'],
      tiny: ['0.875rem', '1.375'],
      lg: ['1.125rem', '1.625'],
      xl: ['1.25rem', '1.375'],
      '2xl': ['1.5rem', '1.375'],
      '3xl': ['1.875rem', '1.2'],
      '4xl': ['2.25rem', '1.2'],
      '5xl': ['3rem', '1.2'],
      '6xl': ['4rem', '1.2'],
      '7xl': ['5rem', '1.2']
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        teal: {
          light: '#56DCE3',
          dark: '#004E61',
          DEFAULT: '#429CAC',
        },
        blue: {
          light: '#D4E6FF',
        },
        brown: {
          light: '#6C3F3F',
          dark: '#362626',
        },
        mauve: {
          light: '#C9497A',
          dark: '#963E63',
        },
      },
      height: {
        '75': '18.75rem',
      },
      margin: {
        '2.5': '0.625rem',
        '7.5': '1.875rem',
      },
      spacing: {
        '2.5': '0.625rem',
        '7.5': '1.875rem',
        '500': '31.25rem',
        '650': '40.625rem',
      },
      zIndex: {
        '0': '0',
        '1': '1',
        '5': '5',
      },
      aspectRatio: {
        'card': '3 / 4',
      },
    },
  },
  variants: {
    extend: {
      outline: ['focus-visible'],
    },
  },
  plugins: [ ],
}

