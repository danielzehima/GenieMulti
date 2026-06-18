"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Printer,
  Shirt,
  Camera,
  Stamp,
  ShieldCheck,
  HardHat,
  ArrowRight,
  Sparkles,
  Star,
  Clock,
  BadgeCheck,
  Truck,
  Quote,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import LeadForm from "@/components/LeadForm";
import LeadModal from "@/components/LeadModal";
import Faq from "@/components/Faq";

// Numéro WhatsApp de la structure (à personnaliser)
// Coordonnées de la structure GENIE MULTI-SERVICES
const WHATSAPP_NUMBER = "2250101720472"; // +225 01 01 72 04 72
const PHONES = ["+225 01 71 71 71 36", "+225 07 58 60 00 00"];
const EMAIL = "geniemulti@gmail.com";

// --- Données des services principaux ---
const services = [
  {
    icon: Printer,
    titre: "Imprimerie & Édition",
    desc: "Flyers, cartes de visite, faire-part, carnets et reçus personnalisés. Qualité pro, délais express.",
    image: "/img/imprimerie.jpg",
    tag: "Le plus demandé",
  },
  {
    icon: Shirt,
    titre: "Personnalisation DTF / Sublimation",
    desc: "T-shirts, casquettes, tasses, stylos, gourdes... Donnez vie à vos visuels sur tous supports.",
    image: "/img/personnalisation.jpg",
  },
  {
    icon: Camera,
    titre: "Studio Photo",
    desc: "Photos d'identité, shooting pro et couverture d'événements (mariage, baptême, anniversaire).",
    image: "/img/studio-photo.jpg",
  },
  {
    icon: Stamp,
    titre: "Création de Tampons",
    desc: "Tampons automatiques et personnalisés pour votre entreprise. Conception rapide et soignée.",
    image: "/img/tampon.jpg",
  },
];

// --- Autres expertises (Tech / BTP) ---
const autresExpertises = [
  {
    icon: ShieldCheck,
    titre: "Vidéosurveillance",
    desc: "Installation de caméras de surveillance pour sécuriser vos locaux et votre domicile.",
    image: "/img/videosurveillance.jpg",
  },
  {
    icon: HardHat,
    titre: "Génie Civil & BTP",
    desc: "Études et réalisation de vos projets de construction avec des professionnels qualifiés.",
    image: "/img/btp.jpg",
  },
];

// --- Témoignages ---
const temoignages = [
  {
    nom: "Aïcha K.",
    role: "Gérante de boutique",
    texte:
      "J'ai commandé mes flyers et cartes de visite. Travail impeccable et livré en 48h ! Je recommande à 100%.",
  },
  {
    nom: "Yann B.",
    role: "Organisateur d'événements",
    texte:
      "Les t-shirts personnalisés pour notre événement étaient parfaits. L'équipe est réactive sur WhatsApp.",
  },
  {
    nom: "Fatou D.",
    role: "Particulier",
    texte:
      "Studio photo au top pour notre baptême. Photos magnifiques et l'accueil était chaleureux. Merci !",
  },
];

// --- Arguments de réassurance ---
const reassurances = [
  { icon: Clock, titre: "Délais express", desc: "Livraison en 24-48h" },
  { icon: BadgeCheck, titre: "Qualité garantie", desc: "Satisfait ou refait" },
  { icon: Truck, titre: "Livraison rapide", desc: "Partout à Abidjan" },
  { icon: MessageCircle, titre: "Suivi WhatsApp", desc: "Réponse immédiate" },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  // Ouvre le modal, éventuellement avec un service présélectionné
  const openModal = (service = "") => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ===================== HEADER ===================== */}
      <header className="sticky top-0 z-40 border-b border-sky-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 font-extrabold text-white">
              G
            </div>
            <div className="leading-tight">
              <p className="font-extrabold text-sky-900">GENIE</p>
              <p className="-mt-1 text-xs font-medium text-sky-500">MULTI-SERVICES</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-sky-700 md:flex">
            <a href="#services" className="transition hover:text-sky-500">Services</a>
            <a href="#avis" className="transition hover:text-sky-500">Avis</a>
            <a href="#autres" className="transition hover:text-sky-500">Autres expertises</a>
            <a href="#faq" className="transition hover:text-sky-500">FAQ</a>
          </nav>

          <button
            onClick={() => openModal()}
            className="rounded-full bg-promo px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-promo/30 transition-all hover:bg-promo-dark hover:shadow-lg active:scale-95"
          >
            Obtenir -20%
          </button>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white">
        {/* Cercles décoratifs en arrière-plan */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-promo/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          {/* Colonne texte */}
          <div className="animate-fade-in-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1.5 text-sm font-semibold text-sky-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-promo" />
              Offre de lancement limitée
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-sky-900 sm:text-5xl lg:text-6xl">
              Tous vos besoins,{" "}
              <span className="bg-gradient-to-r from-sky-500 to-sky-700 bg-clip-text text-transparent">
                un seul partenaire
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg text-sky-700">
              Imprimerie, personnalisation textile, studio photo, tampons et solutions tech.
              Un service rapide et de qualité pour les particuliers et les entreprises.
            </p>

            {/* Bloc promo */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-promo/10 px-5 py-3">
              <span className="text-3xl font-extrabold text-promo">-20%</span>
              <span className="text-sm font-medium text-sky-800">
                sur votre <strong>première commande</strong>
                <br />
                pour toute demande aujourd&apos;hui
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => openModal()}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-promo px-7 py-4 text-lg font-bold text-white shadow-xl shadow-promo/30 transition-all hover:bg-promo-dark active:scale-95"
              >
                Je réclame mes -20%
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-sky-200 bg-white px-7 py-4 text-lg font-bold text-sky-700 transition-all hover:border-sky-400 hover:bg-sky-50"
              >
                Voir nos services
              </a>
            </div>

            {/* Preuve sociale */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["bg-sky-400", "bg-sky-500", "bg-promo", "bg-sky-600"].map((c, i) => (
                  <div key={i} className={`h-9 w-9 rounded-full border-2 border-white ${c}`} />
                ))}
              </div>
              <div>
                <div className="flex text-promo">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-sky-700">
                  <strong>+500 clients</strong> satisfaits
                </p>
              </div>
            </div>
          </div>

          {/* Colonne image */}
          <div className="relative animate-fade-in-up [animation-delay:150ms]">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/img/hero-atelier.jpg"
                alt="Atelier GENIE MULTI-SERVICES"
                width={700}
                height={560}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            {/* Badge flottant */}
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl bg-white p-4 shadow-xl sm:flex animate-float">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                <BadgeCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-sky-900">Qualité Pro</p>
                <p className="text-xs text-sky-500">Satisfait ou refait</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== RÉASSURANCE ===================== */}
      <section className="border-y border-sky-100 bg-sky-50/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4">
          {reassurances.map((r) => (
            <div key={r.titre} className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sky-100">
                <r.icon className="h-6 w-6 text-sky-600" />
              </div>
              <div>
                <p className="font-bold text-sky-900">{r.titre}</p>
                <p className="text-sm text-sky-500">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-sky-900 sm:text-4xl">
            Nos services phares
          </h2>
          <p className="mt-4 text-lg text-sky-600">
            Une expertise complète pour donner vie à tous vos projets, du print à la photo.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.titre}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-200/50"
            >
              {/* Image du service */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.titre}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {s.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-promo px-3 py-1 text-xs font-bold text-white shadow">
                    {s.tag}
                  </span>
                )}
              </div>

              {/* Contenu */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 transition-colors group-hover:bg-sky-500">
                  <s.icon className="h-6 w-6 text-sky-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-sky-900">{s.titre}</h3>
                <p className="flex-1 text-sm text-sky-600">{s.desc}</p>
                <button
                  onClick={() => openModal(s.titre)}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-sky-600 transition-colors hover:text-promo"
                >
                  Demander un devis
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== TÉMOIGNAGES ===================== */}
      <section id="avis" className="bg-gradient-to-b from-white to-sky-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-sky-900 sm:text-4xl">
              Ils nous font confiance
            </h2>
            <p className="mt-4 text-lg text-sky-600">
              La satisfaction de nos clients est notre meilleure publicité.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {temoignages.map((t) => (
              <div
                key={t.nom}
                className="flex flex-col rounded-3xl border border-sky-100 bg-white p-7 shadow-sm transition-all hover:shadow-xl"
              >
                <Quote className="h-8 w-8 text-sky-200" />
                <div className="my-3 flex text-promo">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="flex-1 text-sky-700">&laquo; {t.texte} &raquo;</p>
                <div className="mt-5 flex items-center gap-3 border-t border-sky-100 pt-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-sky-600 font-bold text-white">
                    {t.nom.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sky-900">{t.nom}</p>
                    <p className="text-sm text-sky-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== AUTRES EXPERTISES ===================== */}
      <section id="autres" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-sky-900 sm:text-4xl">
            Nos autres expertises
          </h2>
          <p className="mt-4 text-lg text-sky-600">
            Au-delà du print, nous vous accompagnons aussi sur la tech et le BTP.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          {autresExpertises.map((s) => (
            <div
              key={s.titre}
              className="group relative flex items-center gap-5 overflow-hidden rounded-3xl border border-sky-100 bg-white p-5 shadow-sm transition-all hover:shadow-xl"
            >
              <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={s.image}
                  alt={s.titre}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100">
                  <s.icon className="h-5 w-5 text-sky-600" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-sky-900">{s.titre}</h3>
                <p className="text-sm text-sky-600">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <Faq />

      {/* ===================== CTA FINAL + FORMULAIRE ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-600 to-sky-800">
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-promo/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          {/* Texte */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4 text-promo-light" />
              Dernière étape
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Prêt à lancer votre projet avec <span className="text-promo-light">-20%</span> ?
            </h2>
            <p className="mt-5 text-lg text-sky-100">
              Remplissez le formulaire, et notre équipe vous recontacte sous 24h sur WhatsApp
              avec votre code promo et un devis personnalisé. C&apos;est gratuit et sans
              engagement.
            </p>
            <ul className="mt-6 space-y-3">
              {["Réponse en moins de 24h", "Devis gratuit et personnalisé", "Code promo -20% offert"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-sky-50">
                    <BadgeCheck className="h-5 w-5 flex-shrink-0 text-promo-light" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Formulaire intégré (carte blanche) */}
          <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <h3 className="mb-1 text-center text-2xl font-bold text-sky-900">
              Recevez votre offre
            </h3>
            <p className="mb-6 text-center text-sm text-sky-500">
              Quelques secondes suffisent ⏱️
            </p>
            <LeadForm variant="light" />
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-sky-950 text-sky-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 font-extrabold text-white">
                  G
                </div>
                <div className="leading-tight">
                  <p className="font-extrabold text-white">GENIE</p>
                  <p className="-mt-1 text-xs text-sky-400">MULTI-SERVICES</p>
                </div>
              </div>
              <p className="text-sm text-sky-400">
                Votre partenaire pour l&apos;impression, la personnalisation, la photo et bien
                plus.
              </p>
            </div>

            <div>
              <p className="mb-3 font-bold text-white">Nos services</p>
              <ul className="space-y-2 text-sm text-sky-400">
                <li>Imprimerie & Édition</li>
                <li>Personnalisation textile</li>
                <li>Studio Photo</li>
                <li>Tampons & Vidéosurveillance</li>
              </ul>
            </div>

            <div>
              <p className="mb-3 font-bold text-white">Contact</p>
              <ul className="mb-4 space-y-2 text-sm text-sky-300">
                {PHONES.map((tel) => (
                  <li key={tel}>
                    <a
                      href={`tel:${tel.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 transition hover:text-white"
                    >
                      <Phone className="h-4 w-4 text-sky-400" />
                      {tel}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-2 transition hover:text-white"
                  >
                    <Mail className="h-4 w-4 text-sky-400" />
                    {EMAIL}
                  </a>
                </li>
              </ul>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 font-semibold text-white transition hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" />
                Discuter sur WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-sky-800 pt-6 text-center text-sm text-sky-500">
            © {new Date().getFullYear()} GENIE MULTI-SERVICES. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* ===================== BOUTON WHATSAPP FLOTTANT ===================== */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 transition-all hover:scale-110 hover:bg-green-600"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* ===================== MODAL DE CAPTURE ===================== */}
      <LeadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedService}
      />
    </main>
  );
}
