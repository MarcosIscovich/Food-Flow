
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        colorblue: "#060879",
        colororange: "#ea580c",
        accept: "#65a30d",
        error: "#dc2626",
        warning: "#bc7700",
        info: "#facc15", 
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

