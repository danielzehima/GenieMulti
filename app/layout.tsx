import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Police Inter chargée via next/font (variable CSS utilisée dans tailwind.config)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GENIE MULTI-SERVICES | Imprimerie, Personnalisation & Studio Photo",
  description:
    "Imprimerie, personnalisation textile (DTF/Sublimation), studio photo, tampons et solutions tech. Profitez de -20% sur votre première commande.",
  keywords: [
    "imprimerie",
    "flyers",
    "cartes de visite",
    "personnalisation t-shirt",
    "studio photo",
    "tampons",
    "vidéosurveillance",
  ],
  openGraph: {
    title: "GENIE MULTI-SERVICES",
    description:
      "Tous vos besoins en impression, personnalisation et photo. -20% sur votre première commande.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
