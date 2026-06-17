"use client";

import { useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import LeadForm from "./LeadForm";

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
  defaultService?: string;
};

export default function LeadModal({ open, onClose, defaultService }: LeadModalProps) {
  // Bloque le scroll du body + ferme avec la touche Échap
  useEffect(() => {
    if (open) {
      document.body.classList.add("modal-open");
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.classList.remove("modal-open");
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Fond semi-transparent (clic = fermeture) */}
      <div
        className="absolute inset-0 bg-sky-950/70 backdrop-blur-sm animate-fade-in-up"
        onClick={onClose}
      />

      {/* Contenu du modal */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-sky-700 to-sky-900 p-1 shadow-2xl animate-fade-in-up">
        <div className="rounded-[22px] bg-gradient-to-br from-sky-600 to-sky-800 p-6 sm:p-8">
          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {/* En-tête de l'offre */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full bg-promo/20 px-3 py-1 text-sm font-semibold text-promo-light">
              <Sparkles className="h-4 w-4" />
              Offre de bienvenue
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              -20% sur votre 1<sup>ère</sup> commande
            </h2>
            <p className="mt-2 text-sm text-sky-100">
              Laissez vos coordonnées, on s&apos;occupe du reste sur WhatsApp.
            </p>
          </div>

          {/* Formulaire de capture en variant sombre */}
          <LeadForm variant="modal" defaultService={defaultService} />
        </div>
      </div>
    </div>
  );
}
