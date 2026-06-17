import path from "path";
import { fileURLToPath } from "url";

// Résolution absolue du chemin du dossier (robuste quel que soit le cwd du process)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: {
    // On pointe explicitement vers la config Tailwind du projet (chemin absolu)
    // pour éviter qu'un cwd différent ne fasse charger une mauvaise config.
    tailwindcss: { config: path.join(__dirname, "tailwind.config.js") },
    autoprefixer: {},
  },
};

export default config;
