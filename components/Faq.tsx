"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

// Questions/réponses fréquentes des prospects (objections à lever)
const faqs = [
  {
    question: "Où êtes-vous situés ?",
    reponse:
      "Nous sommes à Abidjan, Yopougon Sideci, à 150 m de la pharmacie Akadjoba. Vous pouvez venir récupérer vos commandes directement sur place.",
  },
  {
    question: "Quels sont vos délais de réalisation ?",
    reponse:
      "La plupart des commandes sont prêtes en 24 à 48h. Pour les projets plus complexes, nous vous précisons le délai exact au moment du devis.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    reponse:
      "Nous acceptons les espèces, Wave et le Mobile Money (Orange Money, MTN MoMo, Moov Money). Simple et flexible.",
  },
  {
    question: "Comment récupérer ma commande ?",
    reponse:
      "Le retrait se fait sur place à Yopougon Sideci. Nous vous prévenons sur WhatsApp dès que votre commande est prête.",
  },
  {
    question: "Comment passer commande ou obtenir un devis ?",
    reponse:
      "Remplissez le formulaire en ligne ou écrivez-nous directement sur WhatsApp. Notre équipe vous répond sous 24h avec un devis personnalisé et gratuit.",
  },
  {
    question: "La réduction de -20% s'applique à quoi ?",
    reponse:
      "Elle s'applique à votre toute première commande, tous services confondus : imprimerie, personnalisation, studio photo ou tampons.",
  },
];

export default function Faq() {
  // Index de la question ouverte (la première est ouverte par défaut)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-700">
            <HelpCircle className="h-4 w-4" />
            Questions fréquentes
          </div>
          <h2 className="text-3xl font-extrabold text-sky-900 sm:text-4xl">
            Tout ce que vous devez savoir
          </h2>
          <p className="mt-4 text-lg text-sky-600">
            Vous avez une question ? On y répond ici (et sur WhatsApp 😉).
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-all ${
                  isOpen
                    ? "border-sky-300 bg-sky-50/50 shadow-sm"
                    : "border-sky-100 bg-white hover:border-sky-200"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-bold text-sky-900">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-sky-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* Réponse : hauteur animée via grid-template-rows */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sky-700">{faq.reponse}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
