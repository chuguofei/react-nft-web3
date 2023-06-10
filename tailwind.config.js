/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        success: {
          100: "#d5f5e3",
          200: "#abebc6",
          300: "#82e0aa",
          400: "#58d68d",
          500: "#2ecc71",
          600: "#25a35a",
          700: "#1c7a44",
          800: "#12522d",
          900: "#092917",
        },
      },
    },
  },
  plugins: [],
};
