import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Plusieurs lockfiles existent dans les dossiers parents (autres projets) :
  // on force la racine de tracing sur CE projet pour un packaging correct.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
