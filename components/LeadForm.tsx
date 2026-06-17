"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, User, Mail, Phone, MessageCircle, AlertCircle } from "lucide-react";

// Liste des services proposés (utilisée dans le menu déroulant du formulaire)
const SERVICES = [
  "Imprimerie & Édition",
  "Personnalisation (T-shirt, tasse...)",
  "Studio Photo",
  "Création de Tampons",
  "Vidéosurveillance / BTP",
  "Autre / Je ne sais pas encore",
];

type FormState = {
  nom: string;
  email: string;
  telephone: string;
  service: string;
};

type LeadFormProps = {
  // Permet d'adapter le design selon le contexte (modal sombre vs section claire)
  variant?: "light" | "modal";
  // Service présélectionné si l'utilisateur a cliqué sur une carte précise
  defaultService?: string;
};

export default function LeadForm({ variant = "light", defaultService = "" }: LeadFormProps) {
  const [form, setForm] = useState<FormState>({
    nom: "",
    email: "",
    telephone: "",
    service: defaultService,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Mise à jour générique des champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // Récupère le premier message d'erreur renvoyé par la validation Zod
        throw new Error(data?.error || "Une erreur est survenue. Réessayez.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
    }
  };

  // --- Écran de confirmation après soumission réussie ---
  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 text-center animate-fade-in-up">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-sky-900">Demande envoyée ! 🎉</h3>
        <p className="max-w-sm text-sky-700">
          Merci <span className="font-semibold">{form.nom.split(" ")[0]}</span> ! Notre équipe
          vous contacte sous 24h sur WhatsApp pour activer votre{" "}
          <span className="font-bold text-promo">réduction de 20%</span>.
        </p>
      </div>
    );
  }

  // Styles dynamiques selon le variant (labels lisibles sur fond clair ou sombre)
  const labelClass =
    variant === "modal" ? "text-sky-100" : "text-sky-800";
  const inputClass =
    "w-full rounded-xl border border-sky-200 bg-white py-3 pl-11 pr-4 text-sky-900 placeholder-sky-400 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-300";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Champ Nom */}
      <div>
        <label htmlFor="nom" className={`mb-1.5 block text-sm font-medium ${labelClass}`}>
          Nom complet
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-400" />
          <input
            id="nom"
            name="nom"
            type="text"
            required
            value={form.nom}
            onChange={handleChange}
            placeholder="Ex : Daniel Koffi"
            className={inputClass}
          />
        </div>
      </div>

      {/* Champ Email */}
      <div>
        <label htmlFor="email" className={`mb-1.5 block text-sm font-medium ${labelClass}`}>
          Adresse email
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-sky-400" />
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="vous@email.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Champ Téléphone / WhatsApp (mis en avant) */}
      <div>
        <label htmlFor="telephone" className={`mb-1.5 block text-sm font-medium ${labelClass}`}>
          Numéro WhatsApp <span className="text-promo">(prioritaire)</span>
        </label>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-green-500" />
          <input
            id="telephone"
            name="telephone"
            type="tel"
            required
            value={form.telephone}
            onChange={handleChange}
            placeholder="+225 07 00 00 00 00"
            className={inputClass}
          />
        </div>
        <p className={`mt-1 flex items-center gap-1.5 text-xs ${variant === "modal" ? "text-sky-200" : "text-sky-500"}`}>
          <MessageCircle className="h-3.5 w-3.5 text-green-500" />
          Nous vous envoyons votre code promo directement sur WhatsApp.
        </p>
      </div>

      {/* Champ Service souhaité */}
      <div>
        <label htmlFor="service" className={`mb-1.5 block text-sm font-medium ${labelClass}`}>
          Service souhaité
        </label>
        <select
          id="service"
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full rounded-xl border border-sky-200 bg-white px-4 py-3 text-sky-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-300"
        >
          <option value="">-- Choisissez un service --</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Message d'erreur éventuel */}
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Bouton de soumission (CTA orange) */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-promo px-6 py-4 text-lg font-bold text-white shadow-lg shadow-promo/30 transition-all hover:bg-promo-dark hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>🎁 Je profite de mes -20%</>
        )}
      </button>

      <p className={`text-center text-xs ${variant === "modal" ? "text-sky-200" : "text-sky-400"}`}>
        🔒 Vos données restent confidentielles. Aucune carte bancaire requise.
      </p>
    </form>
  );
}
