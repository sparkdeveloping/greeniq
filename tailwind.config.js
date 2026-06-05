/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        moss: {
          50: "#f2f7ed",
          100: "#dcebd1",
          200: "#bdd7aa",
          300: "#97bf7d",
          400: "#72a450",
          500: "#578b36",
          600: "#436f28",
          700: "#355822",
          800: "#2c471f",
          900: "#263d1e"
        },
        soil: {
          50: "#faf5ed",
          100: "#efe1ce",
          200: "#dfbf9e",
          300: "#cf9b6d",
          400: "#c47d45",
          500: "#aa6030",
          600: "#884927",
          700: "#6d3822",
          800: "#5a3020",
          900: "#4d2a1f"
        }
      },
      boxShadow: {
        glow: "0 0 70px rgba(47, 255, 141, 0.18)",
        card: "0 30px 80px rgba(0,0,0,0.35)",
        lift: "0 18px 42px rgba(2, 12, 6, 0.28)"
      },
      borderRadius: {
        fluid: "2rem",
        apple: "2.5rem"
      }
    }
  },
  plugins: []
};
