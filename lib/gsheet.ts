/**
 * Enregistrement des leads dans Google Sheets via un Google Apps Script
 * déployé en "Web App" (webhook).
 *
 * Configuration (.env.local) :
 *   GSHEET_WEBHOOK_URL = URL du déploiement Apps Script (https://script.google.com/.../exec)
 *   GSHEET_TOKEN       = (optionnel) mot de passe partagé pour sécuriser le webhook
 *
 * Procédure de création de la feuille + script : voir docs/google-sheets-setup.md
 * Si GSHEET_WEBHOOK_URL n'est pas défini, la fonction ne fait rien (no-op).
 */

type LeadInfo = {
  nom: string;
  email: string;
  telephone: string;
  service?: string;
};

export async function appendToGoogleSheet(lead: LeadInfo): Promise<void> {
  const url = process.env.GSHEET_WEBHOOK_URL;
  if (!url) return;

  const body = {
    token: process.env.GSHEET_TOKEN || "",
    nom: lead.nom,
    telephone: lead.telephone,
    email: lead.email,
    service: lead.service || "",
    source: "Landing Tunnel de Vente",
    date: new Date().toISOString(),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Apps Script renvoie souvent une redirection ; on suit jusqu'au bout.
      redirect: "follow",
    });
    if (!res.ok) {
      console.error(
        `[gsheet] Apps Script a répondu ${res.status} : ${await res.text()}`
      );
    }
  } catch (err) {
    // Non-bloquant : le lead est déjà sauvegardé dans Supabase.
    console.error("[gsheet] Échec ajout dans Google Sheets :", err);
  }
}
