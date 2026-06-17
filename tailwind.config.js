const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Chemins ABSOLUS : le serveur de dev peut être lancé depuis un autre dossier
  // (cwd différent), donc on ancre le scan sur l'emplacement de ce fichier.
  content: [
    path.join(__dirname, "app/**/*.{js,ts,jsx,tsx,mdx}"),
    path.join(__dirname, "components/**/*.{js,ts,jsx,tsx,mdx}"),
  ],
  theme: {
    extend: {
      colors: {
        // Charte GENIE MULTI-SERVICES : bleu ciel + blanc, accent orange pour les promos/CTA
        sky: {
          DEFAULT: "#0EA5E9",
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
        },
        promo: {
          DEFAULT: "#F97316",
          light: "#FB923C",
          dark: "#EA580C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
