
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6e6f2',
          100: '#b2b2d5',
          200: '#8c8dc1',
          300: '#585aa5',
          400: '#383994',
          500: '#060879',
          600: '#05076e',
          700: '#040656',
          800: '#030443',
          900: '#030333',
        },
        secondary: {
          50: '#fef3e9',
          100: '#fddaba',
          200: '#fcc899',
          300: '#faaf6a',
          400: '#f9a04d',
          500: '#f88821',
          600: '#e27c1e',
          700: '#b06117',
          800: '#884b12',
          900: '#68390e',
        },
        terciary: {
          50: '#e7f1e7',
          100: '#b5d4b4',
          200: '#91bf90',
          300: '#5ea15d',
          400: '#3f8f3d',
          500: '#0f730d',
          600: '#0e690c',
          700: '#0b5209',
          800: '#083f07',
          900: '#063005',
        },
        neutral: {
          50: '#f1f1f1',
          100: '#d5d5d5',
          200: '#c0c0c0',
          300: '#a4a4a4',
          400: '#929292',
          500: '#777777',
          600: '#6c6c6c',
          700: '#545454',
          800: '#414141',
          900: '#323232',
        },
        error: {
          50: '#f9e9e7',
          100: '#ecbab3',
          200: '#e3988e',
          300: '#d76a5b',
          400: '#cf4d3b',
          500: '#c3200a',
          600: '#b11d09',
          700: '#8a1707',
          800: '#6b1206',
          900: '#520d04',
        }
      },
      boxShadow: {
        '3d': '0 1px 2px rgba(0, 0, 0, 0.25), 0 0 0 3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    //  darkTheme: "emerald",
    themes: [
      {
        mytheme: {
          "primary": "#060879",
          "secondary": "#ea580c",
          "accent": "#2563eb",
          "neutral": "#d1d5db",
          "base-100": "#f5f5f4",
          "info": "#facc15",
          "success": "#65a30d",
          "warning": "#bc7700",
          "error": "#dc2626",
        },

      },
    ],
  },
};

