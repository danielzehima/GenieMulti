// Génère la bannière Facebook (851x315 @2x = 1702x630) avec les vraies photos
// en fond (montage à droite) + panneau bleu et texte à gauche.
// Lancer : node scripts/generate-banner.mjs
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG = path.join(__dirname, "..", "public", "img");
const OUT = path.join(__dirname, "..", "public", "banniere-facebook.png");

const W = 1702;
const H = 630;
const SPLIT = 935; // limite panneau bleu / photos
const cellW = 380;
const cellH = 315;
const gridX = 942;

// 4 photos de services pour le montage (haut-gauche, haut-droite, bas-gauche, bas-droite)
const photos = [
  { file: "imprimerie.jpg", x: gridX, y: 0 },
  { file: "personnalisation.jpg", x: gridX + cellW, y: 0 },
  { file: "studio-photo.jpg", x: gridX, y: cellH },
  { file: "tampon.jpg", x: gridX + cellW, y: cellH },
];

// Calque texte (SVG) superposé par-dessus tout
const overlaySvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" font-family="Arial, Helvetica, sans-serif">
  <!-- léger voile bleu sur les photos pour l'unité visuelle -->
  <rect x="${gridX}" y="0" width="${W - gridX}" height="${H}" fill="#0C4A6E" opacity="0.18"/>
  <!-- liseré orange à la jointure -->
  <rect x="${SPLIT}" y="0" width="9" height="${H}" fill="#F97316"/>

  <!-- logo : fond blanc, G bleu -->
  <rect x="110" y="50" width="92" height="92" rx="24" fill="#FFFFFF"/>
  <text x="156" y="116" text-anchor="middle" font-size="58" font-weight="bold" fill="#0369A1">G</text>
  <text x="222" y="102" font-size="46" font-weight="bold" fill="#FFFFFF" letter-spacing="2">GENIE</text>
  <text x="224" y="136" font-size="21" font-weight="bold" fill="#BAE6FD" letter-spacing="7">MULTI-SERVICES</text>

  <!-- slogan principal -->
  <text x="108" y="238" font-size="56" font-weight="bold" fill="#FFFFFF">Notre expertise =</text>
  <text x="108" y="300" font-size="56" font-weight="bold" fill="#FDBA74">votre épanouissement.</text>
  <rect x="114" y="322" width="150" height="9" rx="4" fill="#F97316"/>

  <!-- liste services -->
  <text x="112" y="376" font-size="26" font-weight="bold" fill="#E0F2FE">Imprimerie · Personnalisation · Studio photo · Tampons</text>

  <!-- badge promo -->
  <rect x="112" y="404" width="470" height="80" rx="18" fill="#F97316"/>
  <text x="140" y="458" font-size="40" font-weight="bold" fill="#FFFFFF">−20%<tspan font-size="26" font-weight="bold" dx="14">sur votre 1re commande</tspan></text>

  <!-- contact whatsapp -->
  <rect x="112" y="500" width="470" height="74" rx="18" fill="#16A34A"/>
  <circle cx="156" cy="537" r="22" fill="#FFFFFF"/>
  <path d="M145 548 q-4 -7 2 -15 q8 -7 15 -2 q7 7 2 15 l2 7 l-7 -2 q-8 4 -14 -3 z" fill="#16A34A"/>
  <text x="192" y="547" font-size="30" font-weight="bold" fill="#FFFFFF">+225 01 01 72 04 72</text>
</svg>`;

async function main() {
  // 1) Fond bleu plein
  const base = sharp({
    create: { width: W, height: H, channels: 4, background: "#0369A1" },
  });

  // 2) Photos redimensionnées en "cover" pour le montage de droite
  const photoLayers = await Promise.all(
    photos.map(async (p) => ({
      input: await sharp(path.join(IMG, p.file))
        .resize(cellW, cellH, { fit: "cover" })
        .toBuffer(),
      left: p.x,
      top: p.y,
    }))
  );

  // 3) Composition finale : fond + photos + calque texte
  await base
    .composite([...photoLayers, { input: Buffer.from(overlaySvg), top: 0, left: 0 }])
    .png()
    .toFile(OUT);

  console.log("✅ Bannière générée :", OUT);
}

main().catch((e) => {
  console.error("❌ Erreur :", e);
  process.exit(1);
});
